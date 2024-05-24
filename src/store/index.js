import { createStore } from 'vuex';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';

export default createStore({
  state: {
    user: null,
    studyGroups: [],
    authError: null,
    authMessage: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setStudyGroups(state, studyGroups) {
      state.studyGroups = studyGroups;
    },
    setAuthError(state, error) {
      state.authError = error;
    },
    setAuthMessage(state, message) {
      state.authMessage = message;
    },
  },
  actions: {
    async fetchStudyGroups({ commit }) {
      try {
        const snapshot = await db.collection('studyGroups').get();
        const studyGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit('setStudyGroups', studyGroups);
      } catch (error) {
        console.error('Error fetching study groups:', error);
      }
    },
    async createStudyGroup({ commit, state }, studyGroup) {
      try {
        const expirationDate = new Date();
        expirationDate.setHours(
          expirationDate.getHours() + studyGroup.duration
        ); // Assuming duration is in hours

        const newGroup = {
          ...studyGroup,
          members: [state.user.uid],
          createdBy: state.user.uid,
          expirationDate,
        };
        await db.collection('studyGroups').add(newGroup);
        commit('setAuthMessage', 'Study group created successfully!');
        this.dispatch('fetchStudyGroups'); // Fetch study groups after creating a new one
      } catch (error) {
        commit('setAuthError', error.message);
        console.error('Error creating study group:', error);
      }
    },
    async joinStudyGroup({ commit, state }, groupId) {
      try {
        const groupRef = db.collection('studyGroups').doc(groupId);
        await groupRef.update({
          members: firebase.firestore.FieldValue.arrayUnion(state.user.uid),
        });
        commit('setAuthMessage', 'Successfully joined the study group!');
        this.dispatch('fetchStudyGroups'); // Fetch study groups after joining a group
      } catch (error) {
        commit('setAuthError', error.message);
        console.error('Error joining study group:', error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        commit('setUser', userCredential.user);
        commit('setAuthMessage', 'Login successful!');
        commit('setAuthError', null);
        this.dispatch('fetchStudyGroups'); // Fetch study groups after login
      } catch (error) {
        commit('setAuthError', error.message);
        commit('setAuthMessage', null);
        console.error('Error logging in:', error);
      }
    },
    async register({ commit }, { email, password }) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        commit('setUser', userCredential.user);
        commit('setAuthMessage', 'Registration successful! Please log in.');
        commit('setAuthError', null);
      } catch (error) {
        commit('setAuthError', error.message);
        commit('setAuthMessage', null);
        console.error('Error registering:', error);
      }
    },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit('setUser', null);
        commit('setAuthMessage', 'Logout successful!');
        commit('setAuthError', null);
      } catch (error) {
        commit('setAuthError', error.message);
        commit('setAuthMessage', null);
        console.error('Error logging out:', error);
      }
    },
  },
  modules: {},
});

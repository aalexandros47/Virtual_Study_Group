// Vuex store to manage global state, handles user authentication and study group data.

import { createStore } from 'vuex';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';

export default createStore({
  state: {
    currentUser: null,
    groups: [],
    authMsg: null,
    errorMsg: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setGroups(state, groups) {
      state.groups = groups;
    },
    setAuthMsg(state, msg) {
      state.authMsg = msg;
    },
    setErrorMsg(state, msg) {
      state.errorMsg = msg;
    },
  },
  actions: {
    async fetchGroups({ commit }) {
      try {
        const snapshot = await db.collection('groups').get();
        const groups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit('setGroups', groups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    async createGroup({ commit, state }, groupData) {
      try {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + groupData.duration);

        const newGroup = {
          ...groupData,
          members: [state.currentUser.uid],
          createdBy: state.currentUser.uid,
          expiryDate,
          likes: 0,
        };
        await db.collection('groups').add(newGroup);
        commit('setAuthMsg', 'Group created successfully!');
        this.dispatch('fetchGroups');
      } catch (error) {
        commit('setErrorMsg', error.message);
        console.error('Error creating group:', error);
      }
    },
    async joinGroup({ state }, groupId) {
      try {
        const groupRef = db.collection('groups').doc(groupId);
        await groupRef.update({
          members: firebase.firestore.FieldValue.arrayUnion(
            state.currentUser.uid
          ),
        });
        this.dispatch('fetchGroups');
      } catch (error) {
        console.error('Error joining group:', error);
      }
    },
    async likeGroup({ dispatch }, groupId) {
      try {
        const groupRef = db.collection('groups').doc(groupId);
        const groupDoc = await groupRef.get();
        const currentLikes = groupDoc.data().likes || 0;
        await groupRef.update({ likes: currentLikes + 1 });
        dispatch('fetchGroups');
      } catch (error) {
        console.error('Error liking group:', error);
      }
    },
    async deleteGroup({ dispatch }, groupId) {
      try {
        await db.collection('groups').doc(groupId).delete();
        dispatch('fetchGroups');
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        commit('setCurrentUser', userCredential.user);
        commit('setAuthMsg', 'Login successful!');
        commit('setErrorMsg', null);
        this.dispatch('fetchGroups');
      } catch (error) {
        commit('setErrorMsg', error.message);
        commit('setAuthMsg', null);
        console.error('Error logging in:', error);
      }
    },
    async signup({ commit }, { email, password }) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        commit('setCurrentUser', userCredential.user);
        commit('setAuthMsg', 'Registration successful! Please log in.');
        commit('setErrorMsg', null);
      } catch (error) {
        commit('setErrorMsg', error.message);
        commit('setAuthMsg', null);
        console.error('Error registering:', error);
      }
    },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit('setCurrentUser', null);
        commit('setAuthMsg', 'Logout successful!');
        commit('setErrorMsg', null);
      } catch (error) {
        commit('setErrorMsg', error.message);
        commit('setAuthMsg', null);
        console.error('Error logging out:', error);
      }
    },
  },
  modules: {},
});

import {defineStore} from 'pinia';
import {useApi} from "boot/axios";

const $api = useApi;

export const useUserStore = defineStore('user', {
  state: () => ({
    id: -1,
    accessToken: '',
    refreshToken: '',
    email: '',
    phone: '',
    username: '',
    motto: '',
    region: '',
    avatar: '',
    avatar_hash: '',
    followers: [],
    following: [],
    stars: [],
    posts: [],
    collections: [],
  }),
  getters: {
    count: state => ({
      followers: state.followers.length,
      following: state.following.length,
      stars: state.stars.length,
      posts: state.posts.length,
      collections: state.collections.length,
    }),
  },
  actions: {
    async check() {
      try {
        await $api.auth.check(this.accessToken);
        return true;
      } catch (err) {
        if (err.hasOwnProperty('data') && err.data.hasOwnProperty('code')) {
          try {
            const body = await $api.auth.refresh(this.refreshToken);
            this.accessToken = body.data.accessToken;
            this.refreshToken = body.data.refreshToken;
            return true;
          } catch (refreshError) {
            console.log(refreshError);
            return false;
          }
        } else {
          return false;
        }
      }
    },
    async update() {
      try {
        const data = (await $api.user.getInfo(this.accessToken)).data;
        this.id = data.id;
        this.email = data.email;
        this.phone = data.phone;
        this.username = data.username;
        this.motto = data.motto;
        this.region = data.region;
        // if (this.avatar_hash !== data.avatar_hash) {
        this.avatar = (await $api.user.getAvatar(this.accessToken)).data;
        // }
        this.avatar_hash = data.avatar_hash;
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.id = -1;
      this.accessToken = '';
      this.refreshToken = '';
      this.email = '';
      this.phone = '';
      this.username = '';
      this.motto = '';
      this.region = '';
      this.avatar = '';
      this.avatar_hash = '';
    },
  },
  persist: {
    key: "mnemosyne.user",
  }
})

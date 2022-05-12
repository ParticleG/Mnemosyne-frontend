import {defineStore} from 'pinia';
import {useApi} from "boot/axios";

const $api = useApi;

export const useUserStore = defineStore('user', {
  state: () => ({
    id: -1,
    permission: '',
    username: '',
    motto: '',
    region: '',
    avatar: '',
    avatar_hash: '',
    email: '',
    phone: '',
    accessToken: '',
    refreshToken: '',
    statistics: {
      following: 0,
      followers: 0,
      starred: 0,
      posts: 0,
      collections: 0,
    },
    following: [],
    followers: [],
    starredData: [],
    starredCollections: [],
  }),
  actions: {
    async check() {
      try {
        await $api.auth.check(this.accessToken);
      } catch (err) {
        if (err.hasOwnProperty('data') && err.data.hasOwnProperty('code')) {
          try {
            const body = await $api.auth.refresh(this.refreshToken);
            this.accessToken = body.data.accessToken;
            this.refreshToken = body.data.refreshToken;
          } catch (refreshError) {
            this.logout();
          }
        } else {
          console.warn(err);
        }
      }
    },
    async update() {
      try {
        const data = (await $api.user.getInfo(this.accessToken)).data;
        this.id = data.id;
        this.permission = data.permission;
        this.username = data.username;
        this.motto = data.motto;
        this.region = data.region;
        if (this.avatar_hash !== data.avatar_hash) {
          this.avatar = (await $api.user.getAvatar(this.accessToken)).data;
        }
        this.avatar_hash = data.avatar_hash;
        this.email = data.email;
        this.phone = data.phone;
        this.statistics = data.statistics;

        const {following, followers} = (await $api.user.follow(this.accessToken)).data;
        this.following = following;
        this.followers = followers;

        const {data: starredData, collection: starredCollections} = (await $api.user.starred(this.accessToken)).data;
        this.starredData = starredData;
        this.starredCollections = starredCollections;
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.id = -1;
      this.permission = '';
      this.username = '';
      this.motto = '';
      this.region = '';
      this.avatar = '';
      this.avatar_hash = '';
      this.email = '';
      this.phone = '';
      this.accessToken = '';
      this.refreshToken = '';
      this.statistics = {
        following: 0,
        followers: 0,
        starred: 0,
        posts: 0,
        collections: 0,
      };
    },
  },
  persist: {
    key: "mnemosyne.user",
  }
})

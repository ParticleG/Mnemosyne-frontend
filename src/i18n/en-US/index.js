export default {
  components: {
    languagesMenu: {
      labels: {}
    },
    loginForm: {
      email: {
        labels: {
          title: 'Email Login',
          firstInput: 'Email',
          firstError: 'Invalid Email',
        },
      },
      labels: {
        options: {
          code: 'Login with code',
          password: 'Login with password',
        },
        secondInput: {
          code: 'Validation code',
          password: 'Password'
        },
        secondError: {
          code: 'Invalid validation code',
          password: 'Invalid password'
        },
        sendCode: 'Send',
        submit: 'Login',
      },
      notifications: {
        sendCode: {
          success: 'Code sent successfully',
          failed: 'Failed to send code: ',
          error: 'Error sending code'
        },
        submit: {
          success: 'Login successful',
          failed: 'Failed to login: ',
          error: 'Error logging in'
        }
      },
      phone: {
        labels: {
          title: 'Phone Login',
          firstInput: 'Phone',
          firstError: 'Invalid phone number',
        },
      },
    },
    profileButton: {
      labels: {
        followers: 'Followers',
        following: 'Following',
        stars: 'Stars',
        posts: 'Posts',
        collections: 'Collections',
        logout: 'Logout',
      }
    },
    settingsMenu: {
      labels: {
        darkMode: "Dark mode"
      }
    },
    typeTabs: {
      labels: {
        Audios: "Audios",
        Documents: "Documents",
        Ebooks: "Ebooks",
        Images: "Images",
        Models: "Models",
        Videos: "Videos"
      }
    },
    uploadDialog: {
      labels: {
        title: 'Upload data',
        name: 'Name',
        tags: "Tags",
        collection: "Collection",
        content: "Content",
        visibility: "Visibility",
        extra: "Extra",
        link: "Link",
        file: "File",
        advanced: "Advanced",
        cancel: "Cancel",
        upload: "Upload",
      },
      slider: [
        "Private",
        "Friend Only",
        "Search Only",
        "Public",
      ]
    }
  },
  layouts: {
    headers: {
      main: {
        labels: {
          title: "Mnemosyne",
        }
      },
      search: {
        labels: {
          title: "Mnemosyne",
          search: "Search"
        }
      }
    },
    footers: {
      main: {
        labels: {
          title: "Mnemosyne"
        }
      }
    },
    main: {},
  },
  Mnemosyne: {
    DataManager: {
      invalidEmail: "Invalid email",
      invalidCode: "Invalid code"
    }
  },
  pages: {
    homepage: {
      labels: {
        title: "Mnemosyne",
        search: "Search"
      }
    },
    profile: {
      labels: {
        viewAvatar: 'View avatar',
      },
      tabs: {
        info: "Info",
        relationships: "Relationships",
        stars: "Stars",
        posts: "Posts",
        collections: "Collections",
      }
    },
    loginPage: {
      labels: {
        phone: "Phone",
        email: "Email",
      }
    },
    searchPage: {
      labels: {
        noResults: "No results",
      }
    },
  }
}

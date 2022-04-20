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
        login: 'Login',
        manage: 'Manage your account',
        logout: 'Logout',
      }
    },
    settingsMenu: {
      labels: {
        darkMode: "Dark mode"
      }
    }
  },
  layouts: {
    drawers: {
      main: {
        labels: {}
      }
    },
    headers: {
      main: {
        labels: {
          title: "Mnemosyne",
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
    stack: {
      labels: {
        back: "Back"
      }
    }
  },
  Mnemosyne: {
    DataManager: {
      invalidEmail: "Invalid email",
      invalidCode: "Invalid code"
    }
  },
  pages: {
    main: {
      homepage: {
        labels: {
          title: "Mnemosyne",
          placeholder: "Search"
        }
      },
      profile:{
        labels: {
          viewAvatar: 'View avatar',
        }
      }
    },
    stack: {
      loginPage: {
        labels: {
          phone: "Phone",
          email: "Email",
        }
      }
    }
  }
}

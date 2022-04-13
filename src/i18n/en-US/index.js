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
        usePassWord: 'Use Password',
        secondInput: {
          code: 'Validation code',
          password: 'Password'
        },
        secondError: {
          code: 'Invalid validation code',
          password: 'Invalid password'
        },
        submit: {
          code: 'Get code',
          password: 'Login'
        }
      },
      notifications: {
        success: 'Code sent successfully',
        failed: 'Failed to send code: ',
        error: 'Error sending code'
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
  pages: {
    main: {
      homepage: {
        labels: {
          title: "Mnemosyne",
          placeholder: "Search"
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

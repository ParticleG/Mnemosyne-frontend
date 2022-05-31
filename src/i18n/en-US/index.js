export default {
  components: {
    languagesMenu: {
      labels: {}
    },
    settingsMenu: {
      labels: {
        darkMode: "Dark mode"
      }
    },
    typeTabs: {
      labels: {
        Any: "All",
        Audios: "Audios",
        Binaries: "Binaries",
        Images: "Images",
        Scatters: "Scatters"
      }
    },
    uploadDialog: {
      labels: {
        title: 'Upload data',
        name: 'Name',
        description: 'Description',
        tags: "Tags",
        collection: "Collection",
        content: "Content",
        chooseFile: "Choose a file",
        visibility: "Visibility",
        preview: "Preview",
        extra: "Extra",
        link: "Link",
        file: "File",
        more: "More",
        less: "Less",
        cancel: "Cancel",
        upload: "Upload",
      },
      notifications: {
        submit: {
          success: 'Upload successful',
          failed: 'Failed to upload: ',
          error: 'Error uploading'
        }
      },
      slider: [
        "Private",
        "Protected",
        "Public",
      ]
    }
  },
  layouts: {
    headers: {
      main: {
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
    homePage: {
      labels: {
        noResults: "No results",
      }
    }
  }
}

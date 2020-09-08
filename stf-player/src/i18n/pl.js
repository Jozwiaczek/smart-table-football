import polishMessages from 'ra-language-polish';

export default {
  ...polishMessages,
  pos: {
    search: 'Wyszukiwanie',
    settings: 'Ustawienia',
    language: 'Język',
    theme: {
      name: 'Motyw',
      light: 'Jasny',
      dark: 'Ciemny',
    },
    dashboard: {
      welcome: {
        title: 'Welcome to react-admin demo',
        subtitle:
          "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        aor_button: 'react-admin site',
        demo_button: 'Source for this demo',
      },
    },
    menu: {
      dashboard: 'Pulpit',
      profile: 'Profil',
      teams: 'Zespoły',
      matches: 'Rozgrywki',
    },
  },
  global: {
    add: 'add',
    edit: 'edit',
    delete: 'delete',
  },
  resources: {
    players: {
      notification: {
        removeAccount: 'Account deleted',
        saveChanges: {
          success: 'Saving changes successful',
          failure: 'Saving changes failed',
        },
      },
    },
    users: {
      actions: {
        addProfilePicture: {
          label: 'Profile picture',
          buttonLabel: 'Add picture',
        },
        sendResetPwd: {
          label: 'Password reset',
          buttonLabel: 'Send password reset email',
        },
        verifySignupShort: {
          label: 'Verify Sign Up with Short',
          buttonLabel: 'Verify with short token',
        },
        verifySignupLong: {
          label: 'Verify Sign Up with Long',
          buttonLabel: 'Verify with long token',
        },
      },
      notification: {
        appendImage: {
          profilePicture: {
            success: 'Appending profile picture successful',
            failure: 'Appending profile picture failed',
          },
        },
        playerAuthManagement: {
          success: {
            playerAuthManagement: 'Auth management action success',
            sendResetPwd: 'Send password rest to %{email}',
            verifySignupShort: 'Verification successful',
            verifySignupLong: 'Verification successful',
          },
          failure: {
            playerAuthManagement: 'Auth management action failure',
            sendResetPwd: 'Failed to send password reset',
            verifySignupShort: 'Verification failed',
            verifySignupLong: 'Verification failed',
          },
        },
      },
    },
  },
};

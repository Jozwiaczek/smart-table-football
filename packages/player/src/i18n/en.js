import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  pos: {
    settings: 'Settings',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      title: 'Welcome ',
      prepareSection: {
        description: 'If you want to play a game, click button below',
        button: 'Prepare match',
      },
      teamsSection: {
        title: 'Teams',
        button: 'Invite friend',
      },
      statisticSection: {
        title: 'Statistic',
        items: {
          longestWinStreak: 'Longest win streak',
          numberOfGoals: 'Number of goals',
          winRatio: 'Win ratio',
          matchesInWeek: 'Matches in week',
        },
      },
      lastMatchSection: {
        title: 'Last match',
      },
    },
    menu: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      teams: 'Teams',
      matches: 'Matches',
    },
    auth: {
      login: {
        sign_up: 'Sign Up',
      },
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

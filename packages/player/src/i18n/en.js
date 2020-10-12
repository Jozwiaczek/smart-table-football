import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  installPWAModal: {
    title: 'Install STF App',
    subtitle: 'Install this application on your homescreen for a better experience.',
    actionLabel: {
      tap: 'Tap',
      thenAddToHomeScreen: 'then "Add to Home Screen"',
    },
    closeButton: 'Close',
  },
  layout: {
    appBar: {
      notifications: {
        title: 'Notifications',
        navigateToPanel: 'Notifications panel',
        emptyList: 'You dont have new notifications',
      },
      tableStatus: {
        connected: 'Table is connected',
        disconnected: 'Table is disconnected',
        busy: 'There is an active match',
        ready: 'Ready to play!',
        join: {
          tooltip: 'Click to join your current match',
          button: 'Join',
        },
      },
    },
    userMenu: {
      profile: 'Profile',
      settings: 'Settings',
    },
  },
  models: {
    players: {
      profile: {
        title: 'Profile',
        general: 'General',
        account: 'Account',
        actions: 'Actions',
      },
      avatar: {
        upload: 'Upload Avatar',
        confirm: 'Confirm Avatar',
        remove: 'Remove Avatar',
      },
    },
  },
  pos: {
    search: 'Search',
    settings: 'Settings',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      title: 'Dashboard',
      welcomeTitle: 'Welcome ',
      welcomeCard: {
        title: 'Welcome in Smart Table Football!',
        subtitle1:
          'Below you find your dashboard with all statistic from games, teams and all numbers.',
        subtitle2:
          'For better user experience you can add STF app to your Home Screen (IOS, Android, Web).',
        button: 'Hide',
      },
      newMatchSection: {
        title: 'New Match?',
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
        body: 'Click button below to show statistic of your last match',
        button: 'Show',
        empty: 'You dont have any matches',
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
        forgetPassword: "I don't remember my password",
      },
      registration: {
        sign_up: 'Sign Up',
        i_have_an_account: 'I have an account',
      },
    },
  },
  global: {
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    saveChanges: 'Save changes',
  },
  resources: {
    players: {
      actions: {
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
        removeAccount: 'Account deleted',
        saveChanges: {
          success: 'Saving changes successful',
          failure: 'Saving changes failed',
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

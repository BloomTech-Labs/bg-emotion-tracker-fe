const MainPage = require('libzy-lib').MainPage;
const GetStarted = require('./src/pages/docs/get-started.md').default;
const StateOfApp = require('./src/pages/docs/state-of-app.md').default;
const Pages = require('./src/pages/docs/pages.md').default;
const Components = require('./src/pages/docs/components.md').default;
const State = require('./src/pages/docs/state.md').default;
const Suggestions = require('./src/pages/docs/suggestions.md').default;
const Bugs = require('./src/pages/docs/bugs.md').default;
const LiveCodeExample = require('./src/pages/docs/live-code-example.mdx')
    .default;
const UsersManual = require('./src/pages/docs/users-manual.md').default;
const API = require('./src/pages/docs/api.md').default;
const StateMgmt = require('./src/pages/docs/state-management.md').default;

module.exports = {
    title: 'B&G Club XP Tracker Documentation',
    subTitle: 'Whatever it Takes to Build Great Futures.',
    github: 'https://github.com/Lambda-School-Labs/bg-emotion-tracker-fe-b',
    githubShort: 'Lambda-School-Labs/bg-emotion-tracker-fe-b',
    menuTree: [
        {
            path: '',
            component: MainPage,
            data: {
                features: [
                    {
                        title: 'Dev Guide',
                        text:
                            'The aims of this document are (1) to provide documentation of the current state of the application, to (2) to provide suggestions for future development, and (3) to identify and document known issues that should be fixed.',

                        button: {
                            path: '/docs/get-started',
                            text: 'more'
                        }
                    },
                    {
                        title: 'The State of the App',
                        text: '',
                        button: {
                            path: '/docs/state-of-app',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Pages',
                        text: '',
                        button: {
                            path: '/docs/state-of-app',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Common Components',
                        text: '',
                        button: {
                            path: '/docs/components',
                            text: 'More'
                        }
                    },
                    {
                        title: 'State',
                        text: '',
                        button: {
                            path: '/docs/state',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Suggestions for Future Development',
                        text: '',
                        button: {
                            path: '/docs/suggestions',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Known Bugs',
                        text: '',
                        button: {
                            path: '/docs/bugs',
                            text: 'More'
                        }
                    }
                ]
            }
        },
        {
            path: 'docs',
            tree: [
                {
                    text: 'Dev Guide',
                    path: 'get-started',
                    component: GetStarted,
                    tree: [
                        {
                            text: 'State Management',
                            path: 'state-management',
                            // id: uuidv4(),
                            component: StateMgmt
                        },
                        {
                            text: 'API Requests',
                            path: 'api',
                            // id: uuidv4(),
                            component: API
                        }
                    ]
                },
                {
                    text: 'State of the App',
                    path: 'state-of-app',
                    component: StateOfApp
                },
                {
                    text: 'Pages',
                    path: 'pages',
                    component: Pages
                },
                {
                    text: 'Common Components',
                    path: 'components',
                    component: Components
                },
                {
                    text: 'State',
                    path: 'state',
                    component: State
                },
                {
                    text: 'Suggestions',
                    path: 'suggestions',
                    component: Suggestions
                },
                {
                    text: 'Bugs',
                    path: 'bugs',
                    component: Bugs
                },
                {
                    text: 'Live Code Example',
                    path: 'live-code-example',
                    component: LiveCodeExample
                },
                {
                    text: 'Users Manual',
                    path: 'users-manual',
                    component: UsersManual
                }
            ]
        }
    ],
    theme: {
        palette: {
            primary: {
                main: '#0081C6'
            },
            secondary: {
                main: '#e65100'
            }
        }
    },
    options: {
        routerType: 'hash' // hash | browser
    }
};

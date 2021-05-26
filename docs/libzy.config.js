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
                            text: 'Get Started'
                        }
                    },
                    {
                        title: 'The State of the App',
                        text: 'pending',
                        button: {
                            path: '/docs/state-of-app',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Pages',
                        text: 'pending',
                        button: {
                            path: '/docs/state-of-app',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Common Components',
                        text: 'pending',
                        button: {
                            path: '/docs/components',
                            text: 'More'
                        }
                    },
                    {
                        title: 'State',
                        text: 'pending',
                        button: {
                            path: '/docs/state',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Suggestions for Future Development',
                        text: 'pending',
                        button: {
                            path: '/docs/suggestions',
                            text: 'More'
                        }
                    },
                    {
                        title: 'Known Bugs',
                        text: 'pending',
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
                    text: 'Get Started',
                    path: 'get-started',
                    component: GetStarted
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

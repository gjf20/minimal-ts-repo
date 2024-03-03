import React, {Suspense, lazy, useCallback} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import {DarkModeWrapper} from 'src/components/darkMode/darkModeWrapper';

import {Sidebar} from './components/base/sidebar';
import {Spinner} from './components/base/spinner';
import {RouteString, routes, routesWithIDParam} from './constants/routes';
import {AboutMe} from './pages/aboutMe';
import AdventureJournal from './pages/adventure-journal';
import AIGen from './pages/ai-gen';
import {DirectoryPage} from './pages/sort-photos/directory';
import {Photos} from './pages/sort-photos/sort-photos';

const CardCounting = lazy(() => import('./pages/card-counting/blackjack-game'));
const CardCountingQuiz = lazy(() => import('./pages/card-counting/blackjack-quiz'));
const CardCountingFaq = lazy(() => import('./pages/card-counting/blackjack-faq'));
const CardCountingLandingPage = lazy(() => import('./pages/card-counting/landingPage'));
const DndNoteTakingHome = lazy(() => import('./pages/dnd-notes/home'));
const CryptographyPage = lazy(() => import('./pages/cryptography'));
const CampaignPage = lazy(() => import('./pages/dnd-notes/campaign'));
const SessionPage = lazy(() => import('./pages/dnd-notes/session'));
const NotFoundPage = lazy(() => import('./pages/error-handling/notFound'));
const Settings = lazy(() => import('./pages/settings'));
const Quiz = lazy(() => import('./pages/quiz'));
const Gamification = lazy(() => import('./pages/gamify'));

function App() {
    const routeMapper = useCallback((route: RouteString) => {
        switch (route) {
            case '':
                return <AboutMe />;
            case 'cards':
                return <CardCountingLandingPage />;
            case 'blackjack':
                return <CardCounting title="Welcome welcome!" />;
            case 'blackjack-faq':
                return <CardCountingFaq />;
            case 'blackjack-quiz':
                return <CardCountingQuiz />;
            case 'quiz':
                return <Quiz name="default quiz" />;
            case 'settings':
                return <Settings user={{name: 'default user'}} />;
            case 'notes':
                return <DndNoteTakingHome />;
            case 'journal':
                return <AdventureJournal width="500" height="500" />;
            case 'photos':
                return <Photos />;
            case 'ai':
                return <AIGen name="foo" />;
            case 'campaign':
                return <CampaignPage />;
            case 'session':
                return <SessionPage />;
            case 'directory':
                return <DirectoryPage foo="" />;
            case 'cryptography':
                return <CryptographyPage />;
            case 'levelup':
                return <Gamification name={''} />;
            default: {
                const exhaustiveCheck: never = route;
                throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
            }
        }
    }, []);

    return (
        <DarkModeWrapper>
            <div className="transition min-h-screen h-fit bg-primary-background text-primary">
                <Router>
                    <Sidebar />
                    <div className="bg-opacity-0">
                        <Suspense fallback={<Spinner />}>
                            <Routes>
                                {routes.map((route, ind) => {
                                    const element = routeMapper(route);
                                    const idParamString = '/:id';
                                    const getsIdParam = routesWithIDParam.includes(route);
                                    const path = `/${route}${getsIdParam ? idParamString : ''}`;
                                    return <Route key={ind} path={path} element={element} />;
                                })}
                                <Route path={'*'} element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </div>
        </DarkModeWrapper>
    );
}

export default App;

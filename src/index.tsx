import {ApolloClient, ApolloProvider, InMemoryCache, TypePolicies} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {FilesInDirResponse} from './__generated__/client-types/graphql';
import {GQLServerURL} from './constants/server-config';
import './index.css';
import reportWebVitals from './reportWebVitals';

export * from './constants';

const typePolicies: TypePolicies = {
    Query: {
        fields: {
            filesInDir: {
                keyArgs: ['input'],
                // Concatenate the incoming list items with
                // the existing list items.
                merge(existing: FilesInDirResponse, incoming: FilesInDirResponse, {args}) {
                    console.log('>>>args', args);
                    console.log('>>>existing', existing);
                    console.log('>>>incoming', incoming);
                    if (existing === undefined) {
                        return incoming;
                    }
                    // Slicing is necessary because the existing data is
                    // immutable, and frozen in development.
                    const offset = !!args ? args.pagination.offset : undefined;
                    const existingList = existing.files;
                    const incomingList = incoming.files;
                    const mergedList = existingList ? existingList.slice(0) : [];

                    //todo investigate: does this leave a gap?
                    for (let i = 0; i < incomingList.length; ++i) {
                        mergedList[offset + i] = incomingList[i];
                    }

                    const mergedResponse = {...existing, ...incoming, files: mergedList};

                    return mergedResponse;
                },
            },
        },
    },
};

const client = new ApolloClient({
    uri: GQLServerURL,
    cache: new InMemoryCache({
        typePolicies: typePolicies,
    }),
    name: 'Jamie apollo client',
    version: '1.0',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

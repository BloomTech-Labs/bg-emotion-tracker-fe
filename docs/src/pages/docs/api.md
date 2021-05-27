# API Requests

## How to make API calls

### You will create several functions and access state depending on your use case.

1. Give the function an approriate name. In this example we are going to get a member from the backend, so we use the name `getMemberData`. We grab the auth token from local storage and use this in the axios header. This should be in every function. We return the data as a promise because all api calls are asynchronous. This signature should look like most of the functions.

```js
// /src/api/index.js

export const getMember = async (id, context) => {
  await getMemberData(id)
    .then(res => {
      context.setId(id);
      context.setExists(res);
    })
    .catch(error => {
      return error;
    });
};

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};
```

2. Next its time to create an action for this api call. This action is the function you will use to import inside of your components. Import the **axios call** you just made at the top of this file. If you need **context** you will have to pass that down to this function from your component. **Note:** We are currently not using the **useReducer** flow in our app, but we have left the **loading** and **error** actions in this file if you choose to do so.

```js
// /src/state/actions/index.js

import {
  ...
  getMembersData,
  ...
} from '../../api';

export const getMember = async (id, context) => {
  await getMemberData(id)
    .then(res => {
      context.setId(id);
      context.setExists(res);
    })
    .catch(error => {
      return error;
    });
};
```

3. Inside of your component. Import the **action** from the actions file and call the function. You may or may not have to import **context** depending on your use case.

```js
// /src/components/pages/MemberScanner/RenderMemberScanner.js

  import { getMember } from '../../../state/actions';
  const memberContext = useContext(MemberContext);

  useEffect(() => {
  ...
  const handleScan = data => {
  ...
      getMember(data, memberContext);
  ...
    }
  };
```

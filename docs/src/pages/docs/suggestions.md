# Suggestions

-   Consolidate Style frameworks. Currently we use Less and Styled-components which isn't ideal. We suggest to just pick on or the other (styled-components or Less).

*   All pages should be responsive and look good on mobile.

*   Review icons for menu. Some icons don't seem to match their links.

*   There is currently no unit testing and it would be a better practice if we include testing and have at least 80% coverage.

*   Since we are using libzy for documentation, Storybook should be removed.

*   /api/index should be refactored. We have hardcoded urls to meet mvp, but it does need to be deduped.

*   ReportsWidget should be more organized.

*   Relook at state management.

*   Lots of duplicate components that could be consolidated to one and put into the commons directory ie. buttons, cards, etc

*   Duplicate logic in some areas that are possible candidates for custom hooks.
    All errors and warnings in the devtools console should be cleaned out.

*   Convert common components to antd components

*   Style the 404 page

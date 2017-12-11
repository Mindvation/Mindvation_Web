import React from 'react';
import {FormattedMessage} from 'react-intl';

export const priorityOptions = [
    {
        text: <FormattedMessage
            id='high'
            defaultMessage='High'
        />,
        value: 3
    },
    {
        text: <FormattedMessage
            id='medium'
            defaultMessage='Medium'
        />,
        value: 2
    },
    {
        text: <FormattedMessage
            id='low'
            defaultMessage='Low'
        />,
        value: 1
    }
];

export const contingencyOptions = [
    {
        text: '0%',
        value: 0
    },
    {
        text: '10%',
        value: 10
    },
    {
        text: '20%',
        value: 20
    },
    {
        text: '30%',
        value: 30
    },
    {
        text: '50%',
        value: 50
    },
    {
        text: '75%',
        value: 75
    },
    {
        text: '100%',
        value: 100
    },
    {
        text: '150%',
        value: 150
    },
    {
        text: '200%',
        value: 200
    },
];

export const statusOptions = [{
    text: <FormattedMessage
        id='new'
        defaultMessage='New'
    />,
    value: "new"
}, {
    text: <FormattedMessage
        id='inProgress'
        defaultMessage='In Progress'
    />,
    value: "inProgress"
}, {
    text: <FormattedMessage
        id='done'
        defaultMessage='Done'
    />,
    value: "done"
}];

export const genderOptions = [
    {
        text: <FormattedMessage
            id='female'
            defaultMessage='Female'
        />,
        value: "F"
    }, {
        text: <FormattedMessage
            id='male'
            defaultMessage='Male'
        />,
        value: "M"
    }, {
        text: <FormattedMessage
            id='other'
            defaultMessage='Other'
        />,
        value: "O"
    }
];

export const staffStatusOptions = [
    {
        text: <FormattedMessage
            id='active'
            defaultMessage='Active'
        />,
        value: 'active'
    }, {
        text: <FormattedMessage
            id='inactive'
            defaultMessage='Inactive'
        />,
        value: 'inactive'
    }, {
        text: <FormattedMessage
            id='cancellation'
            defaultMessage='Cancellation'
        />,
        value: 'cancellation'
    }
];

export const positionLevelOptions = [
    {
        text: <FormattedMessage
            id='junior'
            defaultMessage='Junior'
        />,
        value: 'junior'
    },
    {
        text: <FormattedMessage
            id='intermediate'
            defaultMessage='Intermediate'
        />,
        value: 'intermediate'
    }, {
        text: <FormattedMessage
            id='senior'
            defaultMessage='Senior'
        />,
        value: 'senior'
    }
];

export const modelOptions = [
    {
        text: <FormattedMessage
            id='software'
            defaultMessage='Software'
        />,
        value: 'software'
    },
    {
        text: <FormattedMessage
            id='engineering'
            defaultMessage='Engineering'
        />,
        value: 'engineering'
    },
    {
        text: <FormattedMessage
            id='businessRequirements'
            defaultMessage='Business Requirements'
        />,
        value: 'business requirements'
    },
    {
        text: <FormattedMessage
            id='technology'
            defaultMessage='Technology'
        />,
        value: 'technology'
    }
];

export const iterationCycleOptions = [
    {
        text: '1周',
        value: 1
    },
    {
        text: '2周',
        value: 2
    }, {
        text: '3周',
        value: 3
    }, {
        text: '4周',
        value: 4
    }
];
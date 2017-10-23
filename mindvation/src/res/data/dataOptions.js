import React from 'react';
import {FormattedMessage} from 'react-intl';

export const assignOptions = [
    {
        text: 'Bob',
        value: 'm1',
        image: {avatar: true, src: require('../image/photo.jpg')}
    },
    {
        text: 'Frank',
        value: 'm2',
        image: {avatar: true, src: require('../image/photo.jpg')}
    },
    {
        text: 'Darcy',
        value: 'm3',
        image: {avatar: true, src: require('../image/photo.jpg')}
    },
    {
        text: 'Migun',
        value: 'm4',
        image: {avatar: true, src: require('../image/photo.jpg')}
    }
];

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

export const softModelOptions = [
    {
        text: 'Agile',
        value: 'model01'
    },
    {
        text: 'Waterfall',
        value: 'waterfall'
    }];

export const businessModelOptions = [
    {
        text: 'Business Canvas',
        value: 'model03'
    },
    {
        text: 'EPICs',
        value: 'epics'
    },
    {
        text: 'SWOT',
        value: 'swot'
    }];

export const engineeringModelOptions = [
    {
        text: '8D',
        value: 'model02'
    },
    {
        text: '6 Sigma',
        value: 'sigma6'
    }
];

export const techniqueModelOptions = [
    {
        text: 'DevOps',
        value: 'model04'
    },
    {
        text: 'Technique Platform',
        value: 'tp'
    }
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

export const functionOptions = [
    {
        text: 'Market Analysis',
        value: 'marketAnalysis'
    }, {
        text: 'Requirement Analysis',
        value: 'requirementAnalysis'
    }, {
        text: 'Register',
        value: 'register'
    }, {
        text: 'Sign In',
        value: 'signIn'
    }, {
        text: 'Main Function Flow',
        value: 'mainFunctionFlow'
    }, {
        text: 'Feedback Function',
        value: 'feedbackFunction'
    }, {
        text: 'Data Driven',
        value: 'dataDriven'
    }, {
        text: 'Defect Fixing',
        value: 'defectFixing'
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
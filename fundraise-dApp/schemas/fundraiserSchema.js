export const fundraiserSchema = {
    name: 'fundraisers',
    title: 'Fundraisers',
    type: 'document',
    fields: [
        {
            name: 'frHash',
            title: 'Fundraiser Hash',
            type: 'string',

        },
        {
            name: 'goal',
            title: 'Goal',
            type: 'number'
        },
        {
            name: 'wallet',
            title: 'Wallet Address',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime'
        }

    ]
}
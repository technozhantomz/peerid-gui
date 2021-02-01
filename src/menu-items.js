export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Tools',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'form-basic',
                    title: 'Add Apps',
                    type: 'item',
                    url: '/forms/form-basic',
                    icon: 'feather icon-file-text'
                },
              
            ]
        },
        // {
        //     id: 'pages',
        //     title: 'Pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         },
        //     ]
        // }
    ]
}
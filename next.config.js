/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:"export",
    images:{
        domains:['insidethemagic.net']
    },

    // redirects:async () => 
    // [
    //     {
    //         source:'/about',
    //         destination:'/courses',
    //         permanent:false,
    //     },
        
    //     {
    //         source:'/about/:id',
    //         destination:'/courses/python',
    //         permanent:false,
    //     },

    // ]        //when there is any ongoing update 
}

module.exports = nextConfig

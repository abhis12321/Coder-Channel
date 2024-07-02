/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:"export",
    images:{
        domains:['insidethemagic.net' , 'dfstudio-d420.kxcdn.com' , "encrypted-tbn0.gstatic.com" , "avatars.githubusercontent.com" , "res.cloudinary.com"],
    },
    async headers() {
        return [
          {
            source: '/about',
            headers: [
              { key: 'x-custom-header', value: 'my custom header value' },
              { key: 'x-another-custom-header', value: 'my other custom header value' },
            ],
          },
        ];
      },
      
    reactStrictMode: false,
    
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

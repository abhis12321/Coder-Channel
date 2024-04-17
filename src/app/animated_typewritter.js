import React from "react"; 
// import Typewriter from 'typewriter-effect'; 
import dynamic from 'next/dynamic';

const Typewriter = dynamic(
  (m) => { 
	console.log(m);
	return import('typewriter-effect');
  },
	{ ssr: false }
);


export default function TypingEffect() { 
	console.log(Typewriter , "hello jack..");
return ( 
	<div className="text-white"> 
		<h3>GeeksforGeeks Typing Animation</h3> 
	{/* <Typewriter 
		onInit={(typewriter) => { 
		typewriter.typeString('Hello World!') 
			.callFunction(() => { 
			console.log('String typed out!'); 
			}) 
			.pauseFor(2500) 
			.deleteAll() 
			.callFunction(() => { 
			console.log('All strings were deleted'); 
			}) 
			.start(); 
		}} 
	/>  */}
	</div> 
); 
}

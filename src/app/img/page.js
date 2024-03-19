'use client'
import React from "react"

export default function Page() {
    let imgRef = React.useRef();
    const[img , setImg] = React.useState();
    const handleSubmit = e => {
        // console.dir(imgRef.current.files[0].name);
        console.log(img);
        document.querySelector('.preview').innerHTML = `<img  src=${img} />`;
    }

    return (
    <>
        <h1>Hello Jack</h1>
        <label htmlFor="img">Select a Image</label>
        <input type="file" accept="image/*" id="img" ref={imgRef} onChange={e => setImg(URL.createObjectURL(e.target.files?.[0]))}/>

        <button onClick={handleSubmit}>Submit</button>
        
        <div className="preview">

        </div>
    </>)
}


// export default function Page() {
//     const [image, setImage] = React.useState(null)

//     const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//     setImage(URL.createObjectURL(event.target.files[0]));
//     document.querySelector('.img').innerHTML = `<img src=${URL.createObjectURL(event.target.files[0])} />`
//     }
//     }

//     return (
//     <div>
//         <input type="file" onChange={onImageChange} className="filetype" />
//         {/* <img alt="preview image" src={image}/> */}
//         <div className="img"></div>
//     </div>
//     )
// }
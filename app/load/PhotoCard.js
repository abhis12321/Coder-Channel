import Image from 'next/image';

export function PhotoCard(props) {
    return (
      <div className='preview'>
          <Image src={props?.url} alt='image' width={150} height={150}/>
          <button type='button' onClick={props.deleteIt}> delete</button>
      </div>
    )
  }
  
  
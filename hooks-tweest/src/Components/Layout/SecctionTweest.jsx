import React, {useState,useEffect, useRef} from "react";
import swal from 'sweetalert'



export const SecctionTweest = () =>{
  
  const [Text , setText] = useState({text: '', count: 0, maxchars: 255});
  const [files, setFiles] = useState([]);
  const resetref = useRef()
 
  useEffect(() => {
    const tweest = JSON.parse(localStorage.getItem('tweest')) || []
    setFiles(tweest)
  }, []);

  const charaters = (event) =>{
    const text_onchage = event.currentTarget.value
    const count = text_onchage.length
    setText({text_onchage,count, maxchars: Text.maxchars})

    return text_onchage;
  };

  
  

    const remainningchars = Text.maxchars - Text.count
    const isMaxCharsReached = remainningchars < 40
    const isCharLimitReached = remainningchars <= 0
   
    useEffect(()=>{
      if(isCharLimitReached){
        alert();
      }
    },[isCharLimitReached]);
    
    const alert = ()=>{
      swal("usted a llegado a su limite")
    };

    const handleSaveButtonClick = () => {
      const tweet = { content: Text };
      setFiles([...files, tweet]);
      localStorage.setItem('tweest', JSON.stringify([...files, tweet]));
      setText({ text: '', count: 0, maxchars: Text.maxchars });
      resetref.current.value = ''
    };

  return(
    <section>
      <div id="Counterlengh" className="Counterlengh">
        <textarea name="" ref={resetref} cols="30" rows="10"  placeholder="Escribe texto" onChange={charaters} disabled={isCharLimitReached}></textarea>

        <div className="btnPublic">
          <button onClick={handleSaveButtonClick}>Publicar</button>
        </div>

        <span style={{color:isMaxCharsReached ? 'red': 'inherit' }}>{remainningchars}</span>
      </div>

      <div className="seccondiv">
            {files.map((file, i) =>(
              <p key={i}>{file.content.text_onchage}</p>
            ))}
      </div>
    </section>
  )
}
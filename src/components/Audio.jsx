import AudioPlayer from "material-ui-audio-player";


function AudioPlay( { srcSet } ) {

    

     return (
          <div className="max-w-[400px] w-[50%] flex flex-col gap-6">
               <p className="text-gray-300 ">Resultado: </p>

               <AudioPlayer
                    
                    elevation={1}
                    width="100%"
                    variation="secondary"
                    download={true}
                    // loop={true}
                    // spacing={spacing}
                    debug={false}
                    src={srcSet}
               />
          </div>
     );
}

export default AudioPlay;
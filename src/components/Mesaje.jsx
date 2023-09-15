
import { Textarea, Button, SelectItem, Select, CircularProgress } from "@nextui-org/react";
import { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/axios";
import AudioPlay from "./Audio";
import IDIOMAS from "../data/idiomas";

function Mensaje() {
     const mensajeRef = useRef()
     const selectionRef = useRef()
     const [srcSet, setSrcSet] = useState( '' );
     const [loading, setLoading] = useState( false );
     const [errorRequests , setErrorRequests ] = useState( false );

     const submitHandler = async ( e ) => {
          e.preventDefault()

          try {
               setLoading( true )
               const data = await fetcher( [import.meta.env.VITE_URL,
               { mensaje: mensajeRef.current.value, idioma: IDIOMAS[selectionRef.current.value][2] }] )
               console.log( data )
               if ( data?.status ) {
                    setSrcSet( data?.result?.audio_url )
               }
               setLoading( false )

          } catch ( error ) {
               console.log( error )
               setErrorRequests(true)
               setLoading( false )

          }
          mutate( import.meta.env.VITE_URL )
     }

     return (
          <>
               <form onSubmit={submitHandler} className="max-w-[700px] w-[100%]  text-white flex flex-col gap-5 md:w-[50%]">
                    <Select
                         key="secondary"
                         color="secondary"
                         label="Selecciona un Idioma"
                         placeholder="Selecciona un Idioma"
                         // defaultSelectedKeys={[ `${IDIOMAS[0][0]} - ${IDIOMAS[0][4]}`]}
                         isRequired={true}
                         className="max-w-xs text-black"
                         ref={selectionRef}
                         startContent={
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 7H7V17H5V7ZM1 10H3V14H1V10ZM9 2H11V20H9V2ZM13 4H15V22H13V4ZM17 7H19V17H17V7ZM21 10H23V14H21V10Z"></path></svg>
                         }
                    >
                         {IDIOMAS.map( ( idioma, index ) => (
                              <SelectItem key={index} value={idioma[2]}>
                                   {`${idioma[0]} - ${idioma[4]}`}
                              </SelectItem>
                         ) )}
                    </Select>

                    <Textarea
                         label="Mensaje"
                         variant="bordered"
                         labelPlacement="outside"
                         placeholder="Mensaje a convertir a voz"
                         defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                         className="w-[100%]"
                         color="secondary"
                         ref={mensajeRef}
                    />
                    <Button type="submit" color="secondary" variant="shadow" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent text-white font-bold text-sm w-fit" >
                         Convertir
                    </Button>
               </form>
               {!loading &&
                    srcSet != '' &&
                    <AudioPlay srcSet={srcSet} />
               }
               {
                    loading  && <CircularProgress label="Cargando..."  color="secondary"/>
               }
               {
                    errorRequests && <p className="mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Sin Pedidos de la API consulte en: https://rapidapi.com/cloudlabs-dev/api/cloudlabs-text-to-speech/pricing</p>
               }
               
          </>
     );
}

export default Mensaje;
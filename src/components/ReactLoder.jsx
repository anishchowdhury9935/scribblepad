import React,{useContext} from 'react'
import noteContext from '../context/noteContext';
import LoadingBar from 'react-top-loading-bar';
export default function ReactLoder() {
    const context = useContext(noteContext)
    const { Progress } = context;
  return (
    <div>
        <LoadingBar
                color='cyan'
                progress={Progress}
                onLoaderFinished={() => ({ Progress: 0 })}
                transitionTime={150}
                height = {3}
            />
    </div>
  )
}

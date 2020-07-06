import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import ImagesList from "./components/ImagesList";
import Loader from "./components/Loader";

function App() {

    const [breeds, setBreeds] = useState(() => JSON.parse(localStorage.getItem('breeds')) || []);
    const [images, setImages] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [loading, setLoading] = useState(true);
    const selectRef = useRef();


    useEffect(() => {
        (async () => {

            if (breeds === []) return breeds;

            const res = await fetch('https://dog.ceo/api/breeds/list/all');
            const data = Object.keys((await res.json()).message);
            localStorage.setItem('breeds', JSON.stringify(data));
            setBreeds(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);

            if (selectedBreed === '') {
                // "https://dog.ceo/api/breeds/image/random"
                Promise.all(Array(8).fill(null).map(async () => {
                        const res = await fetch('https://dog.ceo/api/breeds/image/random');
                        return (await res.json()).message;
                    })
                ).then(values => {
                    setImages(values);
                    setLoading(false);
                });

                return;
            }
            const res = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
            const data = (await res.json()).message || [];
            if (!!data) {
                setImages(data);
                setLoading(false);
            }
        })();
    }, [selectedBreed]);


    return (
        <div className="App">
            <h1>Dogs</h1>
            <select ref={selectRef} value={selectedBreed} onChange={() => setSelectedBreed(selectRef.current.value)}>
                <option value="" disabled>Select...</option>
                {
                    breeds.map(breed => {
                        return (<option value={breed} key={breed}>{breed}</option>);
                    })
                }
            </select>
            <div className="list">
                {loading ?
                    <Loader/> :
                    <ImagesList breed={selectedBreed} images={images}/>
                }
            </div>
        </div>
    );
}

export default App;

import React from "react";
import Header from "../../components/1header/Header";
import { useState } from 'react';
import Axios from 'axios';
import '../../components/App.css';
import { v4 as uuidv4 } from 'uuid';
import Receipe from '../../components/Receipe.js';

const Home = () => {
  // return (
  //   <>
  //     <Header />
  //     <div>hello home</div>
  //     <div>
  //       <button onClick={()=>{ localStorage.removeItem("token");}} > clear storage</button>
  //     </div>
  //   </>
  // );


  const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    const App_id = "32cfb61c";
    const App_key = "1f7b73c2a07ff2303fe050fc9c9c3fab";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_key}&from=0&to=12&calories=591-722&health=alcohol-free`;

    const getdata = async () => {
        if (query === "") {
            return;
        }
        try {
            const result = await Axios.get(url);
            setRecipes(result.data.hits);
            setQuery("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const onChange = e => {
        setQuery(e.target.value);
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            getdata();
        }
    }

    return (
        <>
        <Header />
            <div className='pos'>
                <div className='dhe1'>
                    <h1 className='he1'>Search Your Recipe</h1>
                </div>
                <div className='ds'>
                    <input
                        type="text"
                        autoComplete='off'
                        className='search'
                        onChange={onChange}
                        onKeyPress={handleKeyPress}
                        value={query}
                    />
                    <button onClick={getdata} className="btn1">Search</button>
                </div>
            </div>
            <div className='bd'>
                <div className='rec'>
                    {recipes.map(re => (
                        <Receipe
                            key={uuidv4()}
                            label={re.recipe.label}
                            img={re.recipe.image}
                            url={re.recipe.url}
                            ingr={re.recipe.ingredients}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

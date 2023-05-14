import { useEffect, useState } from "react";
const MemeCard = function () {
  const [newImage, setNewImage] = useState("https://i.imgflip.com/1g8my4.jpg");
  const [text, setText] = useState({
    TopText: "",
    BottomText: "",
  });
  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((memeData) => setAllMemes(memeData.data.memes));
  }, []);
  let randImage;
  function getMemeImage() {
    const randNumb = Math.round(Math.random() * allMemes.length);
    randImage = allMemes[randNumb].url;
    setNewImage(randImage);
    // console.log(randImage);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  }
  return (
    <section className='text-generator'>
      <form className='input-field'>
        <input
          onChange={handleChange}
          className='input'
          type='text'
          name='TopText'
          value={text.TopText}
          placeholder='Top text'
        />
        <input
          onChange={handleChange}
          className='input'
          type='text'
          name='BottomText'
          value={text.BottomText}
          placeholder='Bottom Text'
        />
      </form>
      <button onClick={getMemeImage} className='btn'>
        Generate new Image
      </button>
      <div className='img-div'>
        <img className='generated-img' src={newImage} alt='meme' />
        <p className='text top'>{text.TopText}</p>
        <p className='text bottom'>{text.BottomText}</p>
      </div>
    </section>
  );
};
export default MemeCard;

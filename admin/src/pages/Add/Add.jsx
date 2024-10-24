// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import upload_area from "../../assets/upload_area.png";
// import "./Add.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Add = ({ url = "https://crypto-venture-backend.onrender.com" }) => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "crypto",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("image", image);

//     try {
//       console.log("FormData to be sent:");
//       for (let pair of formData.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }
//       const response = await axios.post(`${url}/api/blog/add`, formData);
//       if (response.data.success) {
//         setData({
//           title: "",
//           description: "",
//           category: "crypto",
//         });
//         setImage(false);
//         toast.success(response.data.message);
//       } else {
//         console.log(response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error while adding the blog.", error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (image) {
//         URL.revokeObjectURL(image);
//       }
//     };
//   }, [image]);

//   return (
//     <div className="add">
//       <form className="flex flex-col gap-[10px]" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex flex-col gap-[10px]">
//           <p className="text-black">Upload Image</p>
//           <label htmlFor="image">
//             <img
//               src={image ? URL.createObjectURL(image) : upload_area}
//               alt=""
//               className="border-2 border-solid border-gray-400"
//             />
//           </label>
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             id="image"
//             hidden
//             required
//             className="border-2 border-solid border-gray-400"
//           />
//         </div>

//         <div className="add-product-name flex flex-col gap-[10px]">
//           <p className="text-black">Product Name</p>
//           <input
//             onChange={onChangeHandler}
//             value={data.title}
//             type="text"
//             name="title"
//             placeholder="Type here"
//             required
//             className="border-2 border-solid border-gray-400"
//           />
//         </div>

//         <div className="add-product-description flex flex-col gap-[10px]">
//           <p className="text-black">Product Description</p>
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description"
//             rows="6"
//             placeholder="Write content here"
//             required
//             className="border-2 border-solid border-gray-400"
//           ></textarea>
//         </div>

//         <div className="add-category-price">
//           <div className="add-category flex flex-col gap-[10px]">
//             <p className="text-black">Product Category</p>
//             <select
//               name="category"
//               value={data.category}
//               onChange={onChangeHandler}
//               className="border-2 border-solid border-gray-400"
//             >
//               <option value="crypto">crypto</option>
//               <option value="bitcoin">bitcoin</option>
//             </select>
//           </div>
//         </div>
//         <button className="add-btn" type="submit">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;

/* eslint-disable react/prop-types */
import "./Add.css";
import { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js"; // Import Draft.js
import "draft-js/dist/Draft.css"; // Import Draft.js default CSS
import upload_area from "../../assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url = "https://crypto-venture-backend.onrender.com" }) => {
  const [image, setImage] = useState(false);

  // Draft.js Editor State
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [data, setData] = useState({
    title: "",
    category: "crypto",
  });

  // Convert editor content to raw HTML (for sending to backend)
  const getEditorContentAsHtml = () => {
    const contentState = editorState.getCurrentContent();
    return contentState.getPlainText(); // Replace with HTML conversion later
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", getEditorContentAsHtml()); // Add content from Draft.js editor
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/blog/add`, formData);
      if (response.data.success) {
        setData({
          title: "",
          category: "crypto",
        });
        setImage(false);
        setEditorState(EditorState.createEmpty()); // Reset Draft.js editor state
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error while adding the blog.", error);
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // Handle Rich Text Formatting (Bold, Italic, Heading)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div className="add">
      <form className="flex flex-col gap-[10px]" onSubmit={onSubmitHandler}>

        <div className="add-img-upload flex flex-col gap-[10px]">
          <p className="text-black">Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
              className="border-2 border-solid border-gray-400"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            className="border-2 border-solid border-gray-400"
          />
        </div>

        <div className="add-product-name flex flex-col gap-[10px]">
          <p className="text-black">Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.title}
            type="text"
            name="title"
            placeholder="Type here"
            required
            className="border-2 border-solid border-gray-400"
          />
        </div>

        {/* Draft.js Editor for Description */}
        <div className="add-product-description flex flex-col gap-[10px]">
          <p className="text-black">Product Description</p>

          <div className="editor-container border-2 border-solid border-gray-400 p-[10px]">
           {/* Rich Text Toolbar */}
           <div className="toolbar flex justify-around mb-[1rem] border-[1px] border-solid border-gray-400 pb-[5px]">
              <button type="button" onClick={() => toggleInlineStyle("BOLD")}>
                <b>B</b>
              </button>
              <button type="button" onClick={() => toggleInlineStyle("ITALIC")}>
                <i>I</i>
              </button>
              {/* <button
                type="button"
                onClick={() => toggleBlockType("header-one")}
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => toggleBlockType("header-two")}
              >
                H2
              </button> */}
              <button
                type="button"
                onClick={() => toggleBlockType("unordered-list-item")}
              >
                UL
              </button>
              <button
                type="button"
                onClick={() => toggleBlockType("ordered-list-item")}
              >
                OL
              </button>
            </div>
           


            {/* Draft.js Editor */}
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
              placeholder="Write content here..."
              className="h-[10rem]"
            />
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-category flex flex-col gap-[10px]">
            <p className="text-black">Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="border-2 border-solid border-gray-400"
            >
              <option value="crypto">crypto</option>
              <option value="bitcoin">bitcoin</option>
            </select>
          </div>
        </div>

        <button className="add-btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;

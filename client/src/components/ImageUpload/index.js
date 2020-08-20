import React, { useState, Component } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UPDATE_USER, UPLOAD_FILE, UPLOAD_FILE_STREAM } from '../../utils/mutations'; 
import { useMutation } from '@apollo/react-hooks';
import ImageUploader from "react-images-upload";
import { Mutation } from "react-apollo";

//image uploading functionality
// import ImageUploading from "react-images-uploading";

// const maxNumber = 10;
// const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

// class ImageUpload extends React.Component {
//   onChange = (imageList) => {
//     // data for submit
//     console.log(imageList);
//   };
//   onError = (errors, files) => {
//     console.log(errors, files);
//   };

//   render() {
//     return (
//       <ImageUploading
//         onChange={this.onChange}
//         maxNumber={maxNumber}
//         multiple
//         maxFileSize={maxMbFileSize}
//         acceptType={["jpg", "gif", "png"]}
//         onError={this.onError}
//       >
//         {({ imageList, onImageUpload, onImageRemoveAll }) => (
//           // write your building UI
//           <div>
//             <button onClick={onImageUpload}>Upload images</button>
//             <button onClick={onImageRemoveAll}>Remove all images</button>

//             {imageList.map((image) => (
//               <div key={image.key}>
//                 <img src={image.dataURL} />
//                 <button onClick={image.onUpdate}>Update</button>
//                 <button onClick={image.onRemove}>Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
//     );
//   }
// }


// import ImageUploader from 'react-images-upload';

// class ImageUpload extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { pictures: [] };
//         this.onDrop = this.onDrop.bind(this);
//     }

//     onDrop(pictureFiles, pictureDataURLs) {
//         this.setState({
//             pictures: pictureFiles
//         });
//     }

//     render() {
//         return (
//             <ImageUploader
//                 withIcon={true}
//                 buttonText='Choose images'
//                 onChange={this.onDrop}
//                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 maxFileSize={5242880}
//                 onError={this.onError}
//             />

//             <div className="">

//             </div>

            
//         );
//     }
// }


// class ImageUpload extends React.Component {
//     constructor(props){
//       super(props)
//       this.state = {
//         file: null
//       }
//       this.handleChange = this.handleChange.bind(this)
//     }
//     handleChange(event) {
//       this.setState({
//         file: URL.createObjectURL(event.target.files[0])
//       })
//     }
//     render() {
//       return (
//         <div>
//           <input type="file" onChange={this.handleChange}/>
//           <img src={this.state.file}/>

//           {/* <button type="submit">Upload Image</button> */}
//         </div>



//       );
//     }
//   }

// export default ImageUpload;



// export default class ImageUpload extends Component {

//     constructor(props) {
//         super(props);

//         this.onFileChange = this.onFileChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             profileImg: ''
//         }
//     }

//     onFileChange(e) {
//         this.setState({ profileImg: e.target.files[0] })
//     }

//     onSubmit(e) {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('profileImg', this.state.profileImg)
//         axios.post("http://localhost:4000/api/user-profile", formData, {
//         }).then(res => {
//             console.log(res)
//         })
//     }




//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <form onSubmit={this.onSubmit}>
//                         <div className="form-group">
//                             <input type="file" onChange={this.onFileChange} />
//                         </div>
//                         <div className="form-group">
//                             <button className="btn btn-primary" type="submit">Upload</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }


// function renderFunction() {


// }


// class ImageUploadClass extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           image: null
//         };
    
//         this.onImageChange = this.onImageChange.bind(this);
//       }
  
//      onImageChange = event => {
//       if (event.target.files && event.target.files[0]) {
//         let img = event.target.files[0];
//         console.log(img);

//         this.setState({
//           image: URL.createObjectURL(img)
//         });


//         const imagePath = '../../images/'+img.name
//         console.log(imagePath);

//         // const userDetail = {}
//         // userDetail.image = imagePath;

//         return imagePath

//         // const [updateUser] = useMutation(UPDATE_USER);
//         // const { data } = updateUser({ variables: {input: userDetail}});

//       }
//     }
// }

//         const ImageUpload = () => {

//             const imageUpl = new ImageUploadClass()

//             const userDetail = {}
//             userDetail.image = imageUpl.onImageChange();
//             console.log(userDetail);
                      
//             const [updateUser] = useMutation(UPDATE_USER);
//             const { data } = updateUser({ variables: {input: userDetail}});

//             // render() {
//                 return (
//                     <div>
//                     <div>
//                         <div>
//                         <img src={this.state.image} />
//                         <h1>Select Image</h1>
//                         <input type="file" name="myImage" onChange={imageUpl.onImageChange} />
//                         </div>
//                     </div>
//                     </div>
//                 )
//             // }
    
//         };


//   export default ImageUpload;
  



// class ImageUpload extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           image: null
//         };
    
//         this.onImageChange = this.onImageChange.bind(this);
//       }
  
//      onImageChange = event => {
//       if (event.target.files && event.target.files[0]) {
//         let img = event.target.files[0];
//         console.log(img);

//         this.setState({
//           image: URL.createObjectURL(img)
//         });


//         const imagePath = '../../images/'+img.name
//         console.log(imagePath);

//         const userDetail = {}
//         userDetail.image = imagePath;

//         // const [updateUser] = useMutation(UPDATE_USER);
//         // const { data } = updateUser({ variables: {input: userDetail}});

//       }
//     }


//         // function imageUpload() {

//         //     const imageUpl = new ImageUpload().onImageChange()

//         //     const userDetail = {}
//         //     userDetail.image = imagePath;

//         //     const [updateUser] = useMutation(UPDATE_USER);
//         //     const { data } = updateUser({ variables: {input: userDetail}});

//         // };

  
//     render() {
//       return (
//         <div>
//           <div>
//             <div>
//               <img src={this.state.image} />
//               <h1>Select Image</h1>
//               <input type="file" name="myImage" onChange={this.onImageChange} />
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }


//   export default ImageUpload;


// const ImageUpload = props => {
//     const [pictures, setPictures] = useState([]);
  
//     const onDrop = picture => {
//       setPictures([...pictures, picture]);
//     };
//     return (
//       <ImageUploader
//         {...props}
//         withIcon={true}
//         onChange={onDrop}
//         imgExtension={[".jpg", ".gif", ".png", ".gif"]}
//         maxFileSize={5242880}
//       />
//     );
//   };
  
//   export default ImageUpload;



function ImageUpload() {

    const state = useSelector((state) => {
        return state
      });
    const dispatch = useDispatch();

    return (

          <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h2>Save Local</h2>
                  <Mutation mutation={UPLOAD_FILE}>
                      {(singleUpload, { data, loading }) => {
                          console.log(data)
                          return (<form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                      <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                          const file = files[0]
                                          file && singleUpload({ variables: { file: file } })
                                      }}/>{loading && <p>Loading.....</p>}</form>)}
                      }
                  </Mutation>
              <h2>Stream to Server</h2>
                   <Mutation mutation={UPLOAD_FILE_STREAM}>
                      {(singleUploadStream, { data, loading }) => {
                          console.log(data)
                          return (<form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                      <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                          const file = files[0]
                                          file && singleUploadStream({ variables: { file: file } })
                                      }}/>{loading && <p>Loading.....</p>}</form>)}
                      }
                   </Mutation>
          </header>

    );
  }
  
  export default ImageUpload;
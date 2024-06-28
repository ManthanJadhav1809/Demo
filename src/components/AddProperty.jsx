import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, collection, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/addProperty.css';

const AddProperty = ({ user }) => {
    const { propertyId } = useParams();
    const [form, setForm] = useState({ place: '', area: '', flatSize:'', nearby: '',rent:'',sellerName:"",phoneNumber:""});
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (propertyId) {
            const fetchProperty = async () => {
                const docRef = doc(db, 'properties', propertyId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setForm(docSnap.data());
                    setImageUrl(docSnap.data().imageUrl);
                }
            };

            fetchProperty();
        }
    }, [propertyId]);

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user && user.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserInfo(userDoc.data());
                    } else {
                        console.log("No such user!");
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            }
        };
        fetchUserInfo();
    }, [user]);
    console.log(userInfo)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0])); // Show image preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error("No user logged in");
            return;
        }

        try {
            let newImageUrl = imageUrl;
            if (image) {
                const storageRef = ref(storage, `property_images/${Date.now()}_${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error("Error uploading image: ", error);
                    },
                    async () => {
                        newImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageUrl(newImageUrl);
                        setUploadProgress(0); // Reset upload progress after upload completes

                        // Proceed with adding/updating the property
                        await saveProperty(newImageUrl);
                    }
                );
            } else {
                // Proceed with adding/updating the property without image change
                await saveProperty(newImageUrl);
            }
        } catch (error) {
            console.error("Error adding/updating property", error);
        }
    };
   
    const saveProperty = async (imageUrl) => {
        if (propertyId) {
            const propertyDoc = doc(db, 'properties', propertyId);
            await updateDoc(propertyDoc, { ...form, imageUrl, userId: user.uid });
            alert('Property updated');
        } else {
            await addDoc(collection(db, 'properties'), {
                ...form,
                imageUrl,
                userId: user.uid,
                contactDetails: user.email,
            });
            alert('Property added');
        }

        navigate('/dashboard');
    };

    // 
    //             sellerName:user.sellerName,
    //             phoneNumber:user.phoneNumber,
    return (
        <div className="add-property">
            <h1>{propertyId ? 'Update Property' : 'Add Property'}</h1>
            <form className="property-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="sellerName"
                    placeholder="Enter Seller Name Eg.joy"
                    value={form.sellerName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Place"
                    value={form.place}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="area"
                    placeholder="Address"
                    value={form.area}
                    onChange={handleChange}
                     required
                />
                
                <select required name="flatSize" value={form.flatSize} id="" onChange={handleChange}>
                    <option value="">Flat size</option>
                    <option value="1Bhk">1 BHK</option>
                    <option value="2Bhk">2 BHK</option>
                    <option value="3Bhk">3 BHK</option>
                    <option value="4Bhk">4 BHK</option>
                    <option value=">4Bhk">More  than 4BHK</option>
                </select>
                <input
                    type="text"
                    name="nearby"
                    placeholder="Nearby"
                    value={form.nearby}
                    onChange={handleChange}
                   required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  required
                  max={13}
                />
                <input
                    type="text"
                    name="rent"
                    placeholder="Enter Rent Rs."
                    value={form.rent}
                    onChange={handleChange}                                                                                                   
                   required
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <p className="upload-progress">Uploading: {uploadProgress}%</p>
                )}
                {imageUrl && <img className="image-preview" src={imageUrl} alt="Preview" />}
                <button type="submit" disabled={uploadProgress > 0 && uploadProgress < 100}>
                    {propertyId ? 'Update Property' : 'Add Property'}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;

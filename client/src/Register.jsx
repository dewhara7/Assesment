import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import Navbar from './Navbar'; // Import Navbar component
import { Calendar } from 'primereact/calendar';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    religion: "",
    gender: "",
    extracurricular: [],
    image: null,
    document: null,
    course: "", // Added course selection
  });
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newExtracurricular = checked
        ? [...prevData.extracurricular, value]
        : prevData.extracurricular.filter((item) => item !== value);
      return { ...prevData, extracurricular: newExtracurricular };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };


  
  const handleSubmit = async (e) => {
    const processingPopup = Swal.fire({
      title: "Processing...",
      html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
    });
    e.preventDefault(); // Prevents default form submission behavior

    try {
      const image = await handleUploadImage()
      const document= await handleUploadDocument()
      const response = await axios.post("http://localhost:3000/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        birthday: formData.birthday,
        religion: formData.religion,
        gender: formData.gender,
        extracurricular: formData.extracurricular,
        course: formData.course,
        image:image,
        document:document,
        status: "accepted", // Add the status field to match your sample data
      }, {
        headers: {
          "Content-Type": "application/json", // Ensures data is sent as JSON
        },
      });

      console.log("Response Data:", response.data);
      Swal.fire('Added!', 'Registration is complete successfully.', 'success');
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };


  const handleUploadImage = async () => {
    if (formData.image) {
      const pdfFile = formData.image;
      console.log(pdfFile);

      const storageRef = ref(storage, `dew/${pdfFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress1 = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload progress:", progress1 + "%");
          },
          (error) => {
            console.error(error.message);
            reject(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log("File uploaded successfully. URL:", url);
                resolve(url); // Resolve the Promise with the URL
              })
              .catch((error) => {
                console.error(error.message);
                reject(error.message);
              });
          }
        );
      });
    } else {
      return "";
    }
  };
  const handleUploadDocument= async () => {
    if (formData.document) {
      const pdfFile = formData.document;
      console.log(pdfFile);

      const storageRef = ref(storage, `dew/${pdfFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress1 = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload progress:", progress1 + "%");
          },
          (error) => {
            console.error(error.message);
            reject(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log("File uploaded successfully. URL:", url);
                resolve(url); // Resolve the Promise with the URL
              })
              .catch((error) => {
                console.error(error.message);
                reject(error.message);
              });
          }
        );
      });
    } else {
      return "";
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Register for Admission</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* First Name */}
        <label htmlFor="firstName" style={styles.label}>First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Last Name */}
        <label htmlFor="lastName" style={styles.label}>Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Address */}
        <label htmlFor="address" style={styles.label}>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Birthday */}
        <label htmlFor="birthday" style={styles.label}>Birthday:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Religion */}
        <label htmlFor="religion" style={styles.label}>Religion:</label>
        <input
          type="text"
          id="religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* Gender (Radio Buttons) */}
        <label style={styles.radioLabel}>Gender:</label>
        <div style={styles.radioContainer}>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        {/* Extracurricular Activities (Checkboxes) */}
        <label style={styles.label}>Extracurricular Activities:</label>
        <div style={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              value="sports"
              checked={formData.extracurricular.includes("sports")}
              onChange={handleCheckboxChange}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              value="music"
              checked={formData.extracurricular.includes("music")}
              onChange={handleCheckboxChange}
            />
            Music
          </label>
          <label>
            <input
              type="checkbox"
              value="arts"
              checked={formData.extracurricular.includes("arts")}
              onChange={handleCheckboxChange}
            />
            Arts
          </label>
        </div>

        {/* Course Dropdown */}
        <label htmlFor="course" style={styles.label}>Select Course:</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select a course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>

        {/* Image Upload */}
        <label htmlFor="image" style={styles.label}>Upload Profile Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Preview" style={styles.imagePreview} />}

        {/* Document Upload */}
        <label htmlFor="document" style={styles.label}>Upload Documents:</label>
        <input
          type="file"
          id="document"
          name="document"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          style={styles.input}
        />

        {/* Submit Button */}
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={isHovered ? { ...styles.submitButton, ...styles.submitButtonHover } : styles.submitButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '50px auto',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#002E5D',
    marginBottom: '20px',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  label: {
    fontSize: '1.1rem',
    margin: '10px 0 5px 0',
    color: '#333',
  },
  input: {
    padding: '10px',
    margin: '10px 0 20px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  radioLabel: {
    fontSize: '1.1rem',
    margin: '10px 0',
    color: '#333',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  imagePreview: {
    marginTop: '10px',
    maxWidth: '200px',
    height: 'auto',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  submitButton: {
    padding: '10px',
    background: 'linear-gradient(to right, #2774ae, #002E5D)',
    color: '#fff',
    border: 'none',
    width: '200px',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    fontSize: '1rem',
  },
  submitButtonHover: {
    backgroundColor: '#03A9F4',
    transform: 'scale(1.05)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default Register;

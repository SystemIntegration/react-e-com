import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [pincode, setPincode] = useState('');
    const [userData, setUserData] = useState();

    // Method for save data in local storage.
    const handleSubmit = (event) => {
        event.preventDefault();
        setUserData({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            address: address1 + "," + address2 + "," + address3 + "," + pincode + "."
        })
        localStorage.setItem("userData", JSON.stringify(userData))
        Swal.fire({
            title: `Hey ${name} are you want to buy this product`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        console.log('userDatauserData', userData);
    };

    return (
        <div className="sign-up-page" style={{ textAlign: 'center' }}>
            <h2>Create an account</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} style={{ marginRight: '1rem' }} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={email}
                        onChange={(event) => setEmail(event.target.value)} /><br /><br />
                    <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                        onChange={(event) => setPassword(event.target.value)} style={{ marginRight: '1rem' }} />
                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)} /><br /><br />
                    <TextField id="outlined-basic" label="Address Line 1" variant="outlined" value={address1}
                        onChange={(event) => setAddress1(event.target.value)} style={{ marginRight: '1rem' }} />
                    <TextField id="outlined-basic" label="Address Line 2" variant="outlined" value={address2}
                        onChange={(event) => setAddress2(event.target.value)} /><br /><br />
                    <TextField id="outlined-basic" label="Address Line 3" variant="outlined" value={address3}
                        onChange={(event) => setAddress3(event.target.value)} style={{ marginRight: '1rem' }} />
                    <TextField id="outlined-basic" label="Pincode" variant="outlined" value={pincode}
                        onChange={(event) => setPincode(event.target.value)} /><br /><br />
                    <Button type="submit" disabled = {pincode !== '' ? false : true} style={{border:'1px solid gray'}}>Sign Up</Button>
                </form>
            </div>
        </div>
    );

}

export default SignUp;

"use client"
import '@/public/assets/css/font-awesome-all.css';
import '@/public/assets/css/flaticon.css';
import '@/public/assets/css/owl.css';
import '@/public/assets/css/bootstrap.css';
import '@/public/assets/css/jquery.fancybox.min.css';
import '@/public/assets/css/animate.css';
import '@/public/assets/css/nice-select.css';
import '@/public/assets/css/color.css';
import '@/public/assets/css/style.css';
import '@/public/assets/css/responsive.css';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';



const Page = () => { // Component should start with a capital letter (Page instead of page)

    // console.log('my login page')
    // useState must be inside the function component
    const [viewError, setViewError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const formHandler = (e) => {
        // console.log(e.target.value);
        setFormValue({...formValue, [e.target.name]: e.target.value});

    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(formValue);
        const result = await signIn('credentials',{
            email: formValue.email,
            password: formValue.password,
            redirect: false,
        });
        // console.log('result', result);
        if(result.code === null){
            setLoading(false);
            toast.success('Logged in successfully');
            const token = await fetch('/api/auth/session').then(res => res.json());

            if (token?.user?.role === 'admin') {
              router.push('/admin/dashboard');  // Redirect admin to admin dashboard
            } else {
              router.push('/user/dashboard');  // Redirect regular user to user dashboard
            }
            // const session = await auth();
            // const getRole = role();
            // if(getRole === 'admin'){
            //     router.push('/admin/dashboard');
            // }else{
            //     router.push('/user/dashboard');
            // }
        }
        if(result.error){
            setLoading(false);
            toast.error(result.code);
        }
        
    }

    return (
      <>
         {/* <!-- login-section --> */}
        <section className="login-section bg-color-2">
            {loading ? <Loader /> : ''}
            <div className="auto-container">
                <div className="inner-container">
                    <div className="inner-box">
                        <h2>User Login</h2>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required 
                                    value={formValue.email}
                                    onChange={formHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    required 
                                    value={formValue.password}
                                    onChange={formHandler}
                                />
                            </div>
                            <div className="form-group message-btn">
                                <button type="submit" className="theme-btn-one">Login Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- login-section end --> */}
      </>
    );
}

export default Page;

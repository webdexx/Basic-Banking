import ProfileImage from '@assets/images/profile.jpg'

export default function ProfileIcon(){
    return (
        <>
            <div className="profile_icon">
                <img src={ProfileImage} alt="" />
            </div>
        </>
    )
}
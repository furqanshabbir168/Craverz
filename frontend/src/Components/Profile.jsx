import { useContext, useState, useEffect } from "react";
import { Edit, Save, Trash2, User, Mail, Phone, Globe, MapPin, Briefcase, Users, Languages, Check } from "lucide-react";
import profilepic from "../assets/dp.jpg";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-hot-toast"; // Added React Hot Toast

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { token, url } = useContext(ShopContext);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profile: {
      address: "",
      state: "",
      country: "",
      postalCode: "",
      gender: "",
      language: [],
      company: "",
      about: "",
      city: "",
      occupation: "",
      phone: "",
      website: ""
    }
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    address: "",
    state: "",
    country: "",
    postalCode: "",
    gender: "",
    language: [],
    company: "",
    about: "",
    city: "",
    occupation: "",
    phone: "",
    website: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.success) {
          setUserProfile(res.data.user);
          setEditData({
            name: res.data.user.name || "",
            email: res.data.user.email || "",
            address: res.data.user.profile?.address || "",
            state: res.data.user.profile?.state || "",
            country: res.data.user.profile?.country || "",
            postalCode: res.data.user.profile?.postalCode || "",
            gender: res.data.user.profile?.gender || "",
            language: res.data.user.profile?.language || [],
            company: res.data.user.profile?.company || "",
            about: res.data.user.profile?.about || "",
            city: res.data.user.profile?.city || "",
            occupation: res.data.user.profile?.occupation || "",
            phone: res.data.user.profile?.phone || "",
            website: res.data.user.profile?.website || ""
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (e) => {
    const languages = e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang !== '');
    setEditData(prev => ({
      ...prev,
      language: languages
    }));
  };

  const handleSave = async () => {
    try {
      const cleanData = {};
      Object.keys(editData).forEach(key => {
        const value = editData[key];
        if (value !== "" && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            if (value.length > 0) cleanData[key] = value;
          } else {
            cleanData[key] = value;
          }
        }
      });

      const res = await axios.put(
        `${url}/api/user/update-profile`,
        cleanData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setUserProfile(res.data.user);
        setEditData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          address: res.data.user.profile?.address || "",
          state: res.data.user.profile?.state || "",
          country: res.data.user.profile?.country || "",
          postalCode: res.data.user.profile?.postalCode || "",
          gender: res.data.user.profile?.gender || "",
          language: res.data.user.profile?.language || [],
          company: res.data.user.profile?.company || "",
          about: res.data.user.profile?.about || "",
          city: res.data.user.profile?.city || "",
          occupation: res.data.user.profile?.occupation || "",
          phone: res.data.user.profile?.phone || "",
          website: res.data.user.profile?.website || ""
        });

        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong while updating");
    }
  };

  const handleCancel = () => {
    setEditData({
      name: userProfile.name || "",
      email: userProfile.email || "",
      address: userProfile.profile?.address || "",
      state: userProfile.profile?.state || "",
      country: userProfile.profile?.country || "",
      postalCode: userProfile.profile?.postalCode || "",
      gender: userProfile.profile?.gender || "",
      language: userProfile.profile?.language || [],
      company: userProfile.profile?.company || "",
      about: userProfile.profile?.about || "",
      city: userProfile.profile?.city || "",
      occupation: userProfile.profile?.occupation || "",
      phone: userProfile.profile?.phone || "",
      website: userProfile.profile?.website || ""
    });
    setIsEditing(false);
  };

  const getDisplayValue = (field, subField = null) => {
    if (isEditing) {
      return subField ? editData[subField] : editData[field];
    } else {
      return subField ? (userProfile.profile?.[subField] || "Not added yet") : (userProfile[field] || "Not added yet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-4 md:p-6">
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-2 rounded-lg mb-4">
        <Check />
        <p className="text-sm">
          Complete your profile to enjoy faster checkout and seamless table reservations and online orders.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="bg-red-500 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-4">
              <img
                src={profilepic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-6 border-white shadow-lg object-cover mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h1 className="text-2xl font-bold text-gray-800 bg-white pb-3 md:pl-10 md:pr-10 md:p-2 max-w-fit rounded-tl-2xl rounded-tr-2xl">{getDisplayValue('name')}</h1>
                    <p className="text-gray-600 flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      {getDisplayValue('email')}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {getDisplayValue(null, 'occupation')} 
                      {userProfile.profile?.company && ` at ${userProfile.profile.company}`}
                    </p>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      readOnly
                      className="text-2xl font-bold bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-full cursor-not-allowed"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      readOnly
                      className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-full cursor-not-allowed"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mt-2.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mt-2.5 cursor-pointer"
                >
                  {isEditing ? <Save size={18} /> : <Edit size={18} />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-red-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Number
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'phone')}
                    </p>
                  ) : (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {userProfile.profile?.website ? (
                        <a href={userProfile.profile.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                          {userProfile.profile.website}
                        </a>
                      ) : "Not added yet"}
                    </p>
                  ) : (
                    <input
                      type="url"
                      name="website"
                      value={editData.website}
                      onChange={handleInputChange}
                      placeholder="Enter website URL"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Gender
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3 capitalize">
                      {getDisplayValue(null, 'gender')}
                    </p>
                  ) : (
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Languages className="w-4 h-4 mr-1" />
                    Languages
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {userProfile.profile?.language && userProfile.profile.language.length > 0
                        ? userProfile.profile.language.join(', ')
                        : "Not added yet"}
                    </p>
                  ) : (
                    <input
                      type="text"
                      value={editData.language.join(', ')}
                      onChange={handleLanguageChange}
                      placeholder="Enter languages (comma separated)"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-red-600" />
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'occupation')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="occupation"
                      value={editData.occupation}
                      onChange={handleInputChange}
                      placeholder="Enter occupation"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'company')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="company"
                      value={editData.company}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>

              {/* About */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me
                </label>
                {!isEditing ? (
                  <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3 min-h-[100px]">
                    {getDisplayValue(null, 'about')}
                  </p>
                ) : (
                  <textarea
                    name="about"
                    value={editData.about}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Address Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Address Information
              </h2>
              <div className="space-y-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'city')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="city"
                      value={editData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'state')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="state"
                      value={editData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state/province"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'country')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="country"
                      value={editData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3">
                      {getDisplayValue(null, 'postalCode')}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="postalCode"
                      value={editData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  {!isEditing ? (
                    <p className="text-gray-800 bg-gray-50 rounded-lg px-4 py-3 min-h-[80px]">
                      {getDisplayValue(null, 'address')}
                    </p>
                  ) : (
                    <textarea
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  )}
                </div>
              </div>
              </div>
              </div>
                

          {/* Delete Account */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => toast("Account deletion coming soon!")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-200"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

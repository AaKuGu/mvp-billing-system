import { use_loading_store } from "@/store/loading";
import toast from "react-hot-toast";

export const handleSubmit = async (
  e,
  formData,
  isSignup,
  authClient,
  router
) => {
  e.preventDefault();

  const { show_loading, hide_loading } = use_loading_store.getState();

  const { name, email, password } = formData;

  try {
    if (isSignup) {
      show_loading(`Signing You Up...`);
      console.log("Signing up with:", formData);
      const { data, error } = await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
          //   image, // User image URL (optional)
          callbackURL: "/go", // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            router.push(`/go`);
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            toast.error(ctx?.error?.message || "Signup failed");
            hide_loading();
          },
        }
      );

      // if (error) {
      //   toast.error(error.message || "Signup failed");
      // } else if (data) {
      //   console.log("✅ Signup success:", data);
      // }
      console.log("data : ", data);
      // Add sign-up logic here
    } else {
      show_loading("Signing in...");

      console.log("Signing in with:", {
        email: formData.email,
        password: formData.password,
      });

      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/go",
          rememberMe: true,
        },
        {
          onSuccess: () => {
            router.push(`/go`);
          },
          onError: (ctx) => {
            toast.error(ctx?.error?.message || "Invalid credentials");
            hide_loading();
          },
        }
      );
      // if (error) {
      //   toast.error(error.message || "Login failed");
      // } else if (data) {
      //   console.log("✅ Login success:", data);
      // }
    }
  } catch (err) {
    console.error("❌ Auth exception:", err);
    toast.error(err?.message || "Something went wrong, please try again");
  }
};

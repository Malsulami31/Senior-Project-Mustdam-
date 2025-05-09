import { SignIn2 } from "/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/test/Signin.js";
import { auth } from "../firebase"; // Adjust the relative path if needed
import { signInWithEmailAndPassword } from "firebase/auth";


jest.mock("firebase/auth");
describe("SignIn2", () => {
    const getDocsMock = jest.requireMock("firebase/firestore").getDocs;
  
    beforeEach(() => {
      jest.clearAllMocks();
      global.alert = jest.fn(); // Mock window.alert
    });
  
    it("should navigate to FarmerProfile if user exists in Farmer collection", async () => {
      signInWithEmailAndPassword.mockResolvedValue({
        user: { uid: "12345" },
      });
      getDocsMock.mockResolvedValueOnce({
        empty: false,
      });
  
      const result = await SignIn2("test@example.com", "password123");
      expect(result).toBe("FarmerProfile");
    });
  
    it("should navigate to Dashboard if user exists in Factory collection", async () => {
      signInWithEmailAndPassword.mockResolvedValue({
        user: { uid: "67890" },
      });
      getDocsMock.mockResolvedValueOnce({
        empty: true,
      });
      getDocsMock.mockResolvedValueOnce({
        empty: false,
      });
  
      const result = await SignIn2("test@example.com", "password123");
      expect(result).toBe("Dashboard");
    });
  
    it("should return NotFound if user does not exist in either collection", async () => {
      signInWithEmailAndPassword.mockResolvedValue({
        user: { uid: "11223" },
      });
      getDocsMock.mockResolvedValueOnce({
        empty: true,
      });
      getDocsMock.mockResolvedValueOnce({
        empty: true,
      });
  
      const result = await SignIn2("test@example.com", "password123");
      expect(result).toBe("NotFound");
    });
  
    it("should throw an error if sign-in fails", async () => {
      signInWithEmailAndPassword.mockRejectedValue(new Error("Authentication failed."));
  
      await expect(SignIn2("test@example.com", "wrongpassword")).rejects.toThrow(
        "Authentication failed."
      );
    });
  });

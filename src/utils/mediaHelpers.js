import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

/**
 * Starts audio recording by requesting microphone access.
 * Returns the media stream if successful.
 */
export const startVoiceRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    throw error;
  }
};

/**
 * Uploads a file to Firebase Storage.
 */
export const uploadMediaFile = async (file, folder = 'chat_media') => {
  const fileName = `${Date.now()}_${file.name || 'media_file'}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

/**
 * Helper to check if a string is a YouTube link and extract the ID.
 */
export const getYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
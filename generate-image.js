import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function main() {
  try {
    console.log("Fetching original image...");
    const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDDfO3dcp9PJ2nZyzHkCWMGBN_k-YDMTyoXcaImqOoPTXZbOMOjRmDAX1vXows8zD1nvNxzqf3ROxNzyExSrglSR1KKNB3e9nvZ7klzlRB2Suz2UobzJn9IKr2yqnrq2R_tKd9HrDrpYUJNwoQSWtb6Iclnxhcbu2mwrtBmvo5MqetEq8HbXw-PvNGIodBmzXSYc8KB_fmpogG_lDRGQuPvtPy17MnGeabTwl27emLmpyYmFPfqkzHUtv_RXH3fhwZ_DAoKQbLOT6k";
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64ImageData = buffer.toString("base64");
    const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

    console.log("Initializing Gemini API...");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Create a futuristic neural-network-style portrait based on the provided photo.

The subject’s face must remain recognizable, but transformed into a refined digital neural structure composed of subtle glowing nodes and connecting lines.

This portrait must follow a premium "Amethyst Editorial" technical design aesthetic, not flashy sci-fi.

Core Visual Style:
- Deep amethyst-toned background with layered violet gradients
- Background colors should resemble dark glass surfaces (#150330 to #301756 range)
- Neural nodes should glow in soft amethyst tones (#c77dff, #c280ff, #e6b8ff)
- Lines connecting nodes should be thin, elegant, and precise
- No excessive brightness or neon colors
- Minimal noise and extremely clean structure
- Elegant, technical, editorial-grade composition

Lighting:
- Soft ambient glow rather than sharp highlights
- Subtle rim lighting around the head
- Nodes emit soft diffused light, not sharp neon
- Maintain atmospheric depth using tonal layering instead of hard shadows

Structure:
- Face rendered as a semi-wireframe neural mesh
- Nodes placed naturally across facial structure
- Connections should feel architectural, like engineered intelligence
- Depth shading should create a gentle illusion of dimensionality
- Avoid overly dense networks — keep breathing room between elements

Background:
- Smooth amethyst gradient or dark blurred environment
- No borders or geometric containers
- Should feel like layered glass surfaces rather than flat color

Framing:
- Head and upper shoulders only
- Centered composition
- Maintain elegant negative space around the subject
- The subject should feel like floating inside an atmospheric technical environment

Mood:
- Sophisticated
- Calm intelligence
- Premium AI infrastructure aesthetic
- Editorial and architectural, not cinematic sci-fi

Output Requirements:
- High-resolution (at least 2048x2048)
- Optimized for both dark mode and light mode compatibility
- Neural glow should remain visible on light backgrounds without becoming harsh
- Clean enough to layer into a professional engineering portfolio UI`;

    console.log("Calling Gemini API...");
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
          imageSize: "2K"
        }
      }
    });

    console.log("Processing response...");
    let imageSaved = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const imageBuffer = Buffer.from(base64EncodeString, 'base64');
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        const outputPath = path.join(publicDir, 'portrait-neural.png');
        fs.writeFileSync(outputPath, imageBuffer);
        console.log("Image saved to", outputPath);
        imageSaved = true;
        break;
      }
    }

    if (!imageSaved) {
      console.error("No image part found in the response.");
    }

  } catch (error) {
    console.error("Error generating image:", error);
  }
}

main();

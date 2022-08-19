import mongoose from 'mongoose';

const MezigzsSchema = new mongoose.Schema(
  {
    blacklist: {
      type: Boolean,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    publicName: {
      type: String,
    },
    profilPic: {
      type: String,
    },
    biography: {
      type: String,
    },
    skills: {
      type: [String],
      defaultValue: [],
    },
    links: {
      type: [
        {
          label: { type: String },
          URL: { type: String },
          isSocialNetwork: { type: Boolean },
          isPublic: { type: Boolean, defaultValue: true },
          favicon: { type: String, defaultValue: '' },
          profileChecked: { type: Boolean, defaultValue: false },
        },
      ],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Mezigzs || mongoose.model('Mezigzs', MezigzsSchema);

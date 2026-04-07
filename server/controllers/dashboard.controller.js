const User = require('../models/user.model');
const PendingSignup = require('../models/pendingSignup.model');
const {
  comparePassword,
  createSafeUser,
  normalizeEmail,
} = require('../utils/auth.util');

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

function sendSuccess(res, status, message, data = null) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

// Read current authenticated user profile.
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.authUserId);

    if (!user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Account not found');
    }

    return sendSuccess(res, HTTP_STATUS.OK, 'Profile loaded', {
      user: createSafeUser(user),
    });
  } catch (_error) {
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to load profile',
    );
  }
};

// Update profile fields (name and email) for current user.
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name === undefined && email === undefined) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Provide at least one field: name or email',
      );
    }

    const user = await User.findById(req.authUserId);
    if (!user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Account not found');
    }

    if (name !== undefined) {
      const trimmedName = String(name || '').trim();

      if (trimmedName.length < 2 || trimmedName.length > 50) {
        return sendError(
          res,
          HTTP_STATUS.BAD_REQUEST,
          'Name must be between 2 and 50 characters',
        );
      }

      user.name = trimmedName;
    }

    if (email !== undefined) {
      const normalizedEmail = normalizeEmail(email);

      if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Invalid email format');
      }

      if (normalizedEmail !== user.email) {
        const existingUser = await User.findOne({ email: normalizedEmail })
          .select('_id')
          .lean();

        if (existingUser) {
          return sendError(
            res,
            HTTP_STATUS.CONFLICT,
            'Email is already used by another account',
          );
        }
      }

      user.email = normalizedEmail;
    }

    await user.save();

    return sendSuccess(res, HTTP_STATUS.OK, 'Profile updated successfully', {
      user: createSafeUser(user),
    });
  } catch (_error) {
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to update profile',
    );
  }
};

// Delete current account after password confirmation.
exports.deleteMyAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return sendError(
        res,
        HTTP_STATUS.BAD_REQUEST,
        'Password is required to delete account',
      );
    }

    const user = await User.findById(req.authUserId).select('+password');

    if (!user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Account not found');
    }

    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches) {
      return sendError(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        'Incorrect password. Account was not deleted.',
      );
    }

    // Remove user and any pending signup data tied to the same email.
    await User.deleteOne({ _id: user._id });
    await PendingSignup.deleteMany({ email: user.email });

    return sendSuccess(res, HTTP_STATUS.OK, 'Account deleted successfully');
  } catch (_error) {
    return sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Failed to delete account',
    );
  }
};

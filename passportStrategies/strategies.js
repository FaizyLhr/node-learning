passport.use(
	new GoogleStrategy(
		{
			clientID: "970213840540-hjn4j2ajjpscp1353j99enckoqr5u2bh.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:3000/api/user/auth/google/callback",
			passReqToCallback: false,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: "5168405613220218",
			clientSecret: "7db90702ddbc1e9e1b5ce3226a6a202a",
			callbackURL: "http://localhost:3000/api/user/auth/facebook/callback",
			profileFields: ["id", "displayName", "name", "gender", "picture.type(large)"],
			enableProof: false,
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Return the list of all restaurants with corresponding tags
 *     tags: [Restaurant]
 *     parameters:
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Tag filter, separate using ',' eg. American,Italian
 *     responses:
 *       200:
 *         description: The list of all restaurants 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       500: 
 *         description: Server error
 *   post:
 *     security: 
 *       - bearerAuth: []
 *     summary: Create a restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Successfully created a restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Server error
 * /restaurants/{id}:
 *   get:
 *     summary: Return a restaurant by id
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's id
 *     responses:
 *       200:
 *         description: The restaurant by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant by id not found
 *       500: 
 *         description: Server error
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a restaurant by id
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Successfully updated restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Restaurant by id not found
 *       500:
 *         description: Server error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a restaurant by id
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's id
 *     responses:
 *       200:
 *         description: Successfully deleted restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Restaurant by id not found
 *       500:
 *         description: Server error
 * /auth/register:
 *   post: 
 *     summary: Register user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered a user
 *       400:
 *         description: Cannot register user
 * /auth/login:
 *   post: 
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully login
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 * /auth/update:
 *   put: 
 *     security:
 *       - bearerAuth: []
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 * /auth/me:
 *   get: 
 *     security:
 *       - bearerAuth: []
 *     summary: Return user's info
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully returned user's info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 * /auth/logout:
 *   get: 
 *     summary: Logout user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully logout
 * /reservations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return the list of reservations
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: The list of all reservations 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       500: 
 *         description: Server error
 * /reservations/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation's ID
 *     responses:
 *       200:
 *         description: The reservation by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500: 
 *         description: Server error
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Successfully updated reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Restaurant is not operating
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500: 
 *         description: Server error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation's ID
 *     responses:
 *       200:
 *         description: Successfully deleted reservation
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500: 
 *         description: Server error
 * /restaurants/{restaurantId}/reservations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return the list of reservations
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's ID
 *     responses:
 *       200:
 *         description: The list of all reservations 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       500: 
 *         description: Server error
 *   post:
 *     security: 
 *       - bearerAuth: []
 *     summary: Create a reservation
 *     tags: [Reservation]
 *     parameters: 
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Successfully created reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Already made 3 reservations/restaurant is not operating
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       404:
 *         description: Restaurant not found
 *       500: 
 *         description: Server error
 * /reservations/{restaurantId}/summary:
 *   get:
 *     summary: Return a summary of a restaurant's reservations
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's id
 *     responses:
 *       200:
 *         description: Successfully return a summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartdata:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     count:
 *                       type: integer
 *                 hourlyForecasts:
 *                   type: object
 *                   properties:
 *                     hour:
 *                       type: integer
 *                     forecast:
 *                       type: integer
 *       404:
 *         description: Reservation/Restaurant not found
 *       500: 
 *         description: Server error
 * /reservations/restaurantinfo:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return the list of reservations
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: The list of all reservations 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401: 
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500: 
 *         description: Server error
 * /reviews:
 *   get:
 *     summary: Return all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: The list of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 * /reviews/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Return a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review's ID
 *     responses:
 *       200:
 *         description: The review by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'   
 *     responses:
 *       200:
 *         description: Successfully updated review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Cannot update other user's review
 *       401:
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         desription: Review not found
 *       500:
 *         description: Server error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review's ID 
 *     responses:
 *       200:
 *         description: Successfully deleted review
 *       400:
 *         description: Cannot delete other user's review
 *       401:
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 * /restaurants/{restaurantId}/reviews:
 *   get:
 *     summary: Return all reviews of restaurant
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's ID
 *     responses:
 *       200:
 *         description: The list of all reviews in restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Server error
 *   post:
 *     security: 
 *       - bearerAuth: []
 *     summary: Create a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses: 
 *       201:
 *         description: Successfully created review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid rating/comment or user hasn't tried this restaurant
 *       401:
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 * /reviews/dashboard:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Return reviews of manager's restaurant
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: The list of reviews by restaurant's manager
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         $ref: '#/components/responses/Unauthenticated'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Server error
 * tags:
 *   - name: Restaurant
 *     description: Restaurant's API 
 *   - name: User
 *     description: User's API
 *   - name: Reservation
 *     description: Reservation's API
 *   - name: Review
 *     description: Review's API
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - subdistrict
 *         - district
 *         - province
 *         - postalcode
 *         - region
 *         - opentime
 *         - closetime
 *         - imageUrl
 *         - tag
 *         - manager
 *       properties: 
 *         id:
 *           type: string
 *           description: auto-generated object id of the restaurant
 *         name:
 *           type: string
 *           description: name of the restaurant
 *         address:
 *           type: string
 *           description: house no., building name, street name, etc.
 *         subdistrict:
 *           type: string
 *           description: subdistrict (tambol, khwaeng, etc.)
 *         district:
 *           type: string
 *           description: district (amphoe, khet, etc.)
 *         province:
 *           type: string
 *           description: province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         region:
 *           type: string
 *           description: region (North, South, Northeastern, Central, etc.)
 *         tel:
 *           type: string
 *           description: telephone number
 *         opentime:
 *           type: string
 *           pattern: '^\d{1,2}:\d{2}$'
 *           description: open time
 *         closetime:
 *           type: string
 *           pattern: '^\d{1,2}:\d{2}$'
 *           description: close time
 *         imageUrl:
 *           type: string
 *           description: image source
 *         map:
 *           type: string
 *           description: restaurant's openstreetmap url
 *         tag:
 *           type: array
 *           items:
 *             type: string
 *         reservation:
 *           type: array
 *           items:
 *             type: string
 *         manager:
 *           type: string
 *           description: manager of this restaurant
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - tel
 *         - email
 *         - password
 *       properties: 
 *         id:
 *           type: string
 *           description: auto-generated object id of the user
 *         name:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: user's email
 *         tel:
 *           type: string
 *           description: telephone number
 *         password:
 *           type: string
 *           format: password
 *           description: user's password
 *         role:
 *           type: string
 *           enum: [user, manager, admin]
 *           description: user's role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: user's registration date-time
 *     Reservation:
 *       type: object
 *       required:
 *         - resvDate
 *         - user
 *         - restaurant
 *       properties: 
 *         id:
 *           type: string
 *           description: auto-generated object id of the reservation
 *         resvDate:
 *           type: string
 *           format: date-time
 *           description: date-time of reservation
 *         user:
 *           type: string
 *           description: user of this reservation
 *         restaurant:
 *           type: string
 *           description: restaurant of this reservation
 *         completed:
 *           type: boolean
 *           description: reservation's completed state
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: date-time of reservation creation
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *         - user
 *         - restaurant
 *       properties: 
 *         id:
 *           type: string
 *           description: auto-generated object id of the review
 *         rating:
 *           type: integer
 *           description: review's rating (1-5)
 *         comment:
 *           type: string
 *           description: review's comment
 *         name:
 *           type: string
 *           description: username
 *         user:
 *           type: string
 *           description: user of this review
 *         restaurant:
 *           type: string
 *           description: restaurant of this review
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: date-time of review
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     Unauthenticated:
 *       description: Need to login
 *     Unauthorized:
 *       description: No access
 */

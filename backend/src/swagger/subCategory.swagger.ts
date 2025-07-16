/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: API for managing sub-categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the sub-category
 *         name:
 *           type: string
 *         category_id:
 *           type: string
 *       example:
 *         _id: 64b0b79fdd1ab37b18940f59
 *         name: React
 *         category_id: 64b0b79fdd1ab37b18940f00
 *
 *     SubCategoryInput:
 *       type: object
 *       required:
 *         - name
 *         - category_id
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the sub-category
 *         category_id:
 *           type: string
 *           description: The ID of the parent category
 *       example:
 *         name: React
 *         category_id: 64b0b79fdd1ab37b18940f00
 */



/**
 * @swagger
 * /api/sub-categories:
 *   post:
 *     summary: Create a new sub-category
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategoryInput'
 *     responses:
 *       201:
 *         description: Sub-category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied. Admin only
 */

/**
 * @swagger
 * /api/sub-categories:
 *   get:
 *     summary: Get all sub-categories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: A list of sub-categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */

/**
 * @swagger
 * /api/sub-categories/category/{id}:
 *   get:
 *     summary: Get sub-categories by category ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: A list of sub-categories in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/sub-categories/{id}:
 *   get:
 *     summary: Get sub-category by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-category ID
 *     responses:
 *       200:
 *         description: Sub-category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Sub-category not found
 */

/**
 * @swagger
 * /api/sub-categories/{id}:
 *   put:
 *     summary: Update a sub-category by ID
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategoryInput'
 *     responses:
 *       200:
 *         description: Sub-category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Sub-category not found
 *       403:
 *         description: Access denied. Admin only
 */

/**
 * @swagger
 * /api/sub-categories/{id}:
 *   delete:
 *     summary: Delete a sub-category by ID
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub-category ID
 *     responses:
 *       204:
 *         description: Sub-category deleted successfully
 *       404:
 *         description: Sub-category not found
 *       403:
 *         description: Access denied. Admin only
 */

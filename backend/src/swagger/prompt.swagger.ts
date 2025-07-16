/**
 * @openapi
 * tags:
 *   name: Prompts
 *   description: Endpoints for managing AI prompts

 * /api/prompts:
 *   post:
 *     tags: [Prompts]
 *     summary: Create a new prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - category_id
 *               - sub_category_id
 *               - prompt
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 64f9c294cb21f7aee7e6e9e4
 *               category_id:
 *                 type: string
 *                 example: 64fa2c98a087b7aa782d2b93
 *               sub_category_id:
 *                 type: string
 *                 example: 64fa2cdd5d1672cb015e6a11
 *               prompt:
 *                 type: string
 *                 example: Explain the theory of relativity in simple terms
 *     responses:
 *       201:
 *         description: Prompt created successfully
 *       400:
 *         description: Validation error
 *
 *   get:
 *     tags: [Prompts]
 *     summary: Get all prompts
 *     responses:
 *       200:
 *         description: List of prompts

 * /api/prompts/{id}:
 *   get:
 *     tags: [Prompts]
 *     summary: Get a specific prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fc7db857481f84264a3baf
 *     responses:
 *       200:
 *         description: Prompt found
 *       404:
 *         description: Prompt not found
 *
 *   put:
 *     tags: [Prompts]
 *     summary: Update a specific prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Update this to use simpler language
 *     responses:
 *       200:
 *         description: Prompt updated
 *       404:
 *         description: Prompt not found
 *
 *   delete:
 *     tags: [Prompts]
 *     summary: Delete a prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt deleted
 *       404:
 *         description: Prompt not found
 *
 * /api/prompts/{id}/regenerate:
 *   post:
 *     tags: [Prompts]
 *     summary: Regenerate a specific prompt by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prompt regenerated successfully
 *       404:
 *         description: Prompt not found

 * /api/prompts/user/{userId}:
 *   get:
 *     tags: [Prompts]
 *     summary: Get all prompts created by a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fa5fcf76e16c5c3045bb8f
 *     responses:
 *       200:
 *         description: List of user's prompts
 *       404:
 *         description: Prompts not found for this user

 * /api/prompts/category/{categoryId}:
 *   get:
 *     tags: [Prompts]
 *     summary: Get prompts by category ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fa2c98a087b7aa782d2b93
 *     responses:
 *       200:
 *         description: Prompts for the given category
 *       404:
 *         description: No prompts found for this category

 * /api/prompts/subcategory/{subCategoryId}:
 *   get:
 *     tags: [Prompts]
 *     summary: Get prompts by sub-category ID
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fa2cdd5d1672cb015e6a11
 *     responses:
 *       200:
 *         description: Prompts for the given sub-category
 *       404:
 *         description: No prompts found for this sub-category
 */

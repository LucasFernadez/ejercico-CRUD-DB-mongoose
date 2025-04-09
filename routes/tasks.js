const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/create', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar tarea', error: error.message });
  }
});

router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar como completada', error: error.message });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
});

module.exports = router;

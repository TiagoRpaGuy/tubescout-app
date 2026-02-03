import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTheme } from '../use-theme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('should initialize with dark theme by default', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('should load theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('should save theme to localStorage when changed', async () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme('light')
    })
    
    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('light')
      expect(result.current.theme).toBe('light')
    })
  })

  it('should apply theme class to document', async () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme('light')
    })
    
    await waitFor(() => {
      expect(document.documentElement.classList.contains('light')).toBe(true)
    })
  })
})

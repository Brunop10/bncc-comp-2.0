import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Pagination as PaginationBase, PaginationContent, PaginationItem } from './ui/pagination'
import { Button } from './ui/button'
import { Label } from './ui/label'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  async function handleGoTo(page: number) {
    await onPageChange(page)
  }

  return (
    <div className="flex justify-between gap-2 items-center w-full">
      <Label className='text-muted-foreground text-nowrap'>
        Total de {totalCount} itens
      </Label>

      <PaginationBase>
        <PaginationContent>
          <PaginationItem>
            <Button 
              className='cursor-pointer'
              variant='outline'
              size='icon'
              aria-label="Voltar para primeira página"
              disabled={pageIndex === 0}
              onClick={() => { void handleGoTo(0); }}
            >
              <ChevronsLeftIcon />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button 
              className='cursor-pointer'
              variant='outline'
              size='icon'
              aria-label="Voltar para página anterior"
              disabled={pageIndex === 0}
              onClick={() => { void handleGoTo(pageIndex - 1); }}
            >
              <ChevronLeftIcon />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button 
              className='cursor-pointer'
              variant='outline'
              size='icon'
              aria-label="Ir para próxima página"
              disabled={pages <= pageIndex + 1}
              onClick={() => { void handleGoTo(pageIndex + 1); }}
            >
              <ChevronRightIcon />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button 
              className='cursor-pointer'
              variant='outline'
              size='icon'
              aria-label="Ir para última página"
              disabled={pages <= pageIndex + 1}
              onClick={() => { void handleGoTo(pageIndex + 1); }}
            >
              <ChevronsRightIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </PaginationBase>
    </div>
  );
}